#!/usr/bin/env node
/**
 * Build wrapper that makes `vite build` resilient on hosts with a low open-file
 * limit (e.g. shared-hosting build containers where `ulimit -n` is 256–1024
 * and cannot be raised). This repo builds 16 template preview entries, and
 * Vite's transform pipeline plus Tailwind's per-entry content scan open far
 * more files in parallel than such containers allow, crashing with EMFILE.
 *
 * Three layers of protection:
 *  1. graceful-fs: queues + retries callback-style fs calls on EMFILE.
 *  2. A global concurrency semaphore + retry around fs.promises methods
 *     (Vite/Rollup read modules through these; graceful-fs does not patch
 *     them). Bounding these leaves FD headroom for everything else.
 *  3. A short blocking retry for sync fs methods (Tailwind's fast-glob
 *     content scan is sync) as a last resort.
 */
import fs from "node:fs";
import fsp from "node:fs/promises";
import gracefulFs from "graceful-fs";

gracefulFs.gracefulify(fs);

const isFdError = (err) => err && (err.code === "EMFILE" || err.code === "ENFILE");

/* ---- async fs.promises: bounded concurrency + non-blocking retry ---- */

const MAX_CONCURRENT_ASYNC_FS = 48;
let active = 0;
const waiters = [];

const acquire = () => {
  if (active < MAX_CONCURRENT_ASYNC_FS) {
    active += 1;
    return Promise.resolve();
  }
  return new Promise((resolve) => waiters.push(resolve));
};

const release = () => {
  const next = waiters.shift();
  if (next) next();
  else active -= 1;
};

const ASYNC_METHODS = [
  "access",
  "appendFile",
  "copyFile",
  "lstat",
  "mkdir",
  "open",
  "opendir",
  "readFile",
  "readdir",
  "realpath",
  "stat",
  "writeFile",
];

for (const name of ASYNC_METHODS) {
  const original = fsp[name];
  if (typeof original !== "function") continue;
  fsp[name] = async function limitedFsOp(...args) {
    await acquire();
    try {
      let delay = 10;
      for (let attempt = 0; ; attempt += 1) {
        try {
          return await original.apply(this, args);
        } catch (err) {
          if (!isFdError(err) || attempt >= 30) throw err;
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay = Math.min(delay * 2, 1000);
        }
      }
    } finally {
      release();
    }
  };
}

/* ---- sync fs: short blocking retry (rarely needed once async is capped) ---- */

const SYNC_RETRY_METHODS = [
  "readdirSync",
  "readFileSync",
  "openSync",
  "statSync",
  "lstatSync",
  "opendirSync",
  "realpathSync",
];

const sleepSync = (ms) => {
  const buf = new Int32Array(new SharedArrayBuffer(4));
  Atomics.wait(buf, 0, 0, ms);
};

for (const name of SYNC_RETRY_METHODS) {
  const original = fs[name];
  if (typeof original !== "function") continue;
  const wrapped = function retryOnEmfile(...args) {
    let delay = 5;
    for (let attempt = 0; ; attempt += 1) {
      try {
        return original.apply(fs, args);
      } catch (err) {
        if (!isFdError(err) || attempt >= 12) throw err;
        sleepSync(delay);
        delay = Math.min(delay * 2, 250);
      }
    }
  };
  // Preserve attached helpers such as fs.realpathSync.native.
  Object.assign(wrapped, original);
  fs[name] = wrapped;
}

const mode = process.argv.includes("--dev") ? "development" : "production";

const { build } = await import("vite");
await build({ mode });
