import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Monitor, RotateCcw, Smartphone, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const isValidHex = (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value);

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0"))
    .join("")}`;

const mixWithWhite = (hex: string, amount: number) => {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  );
};

const getColorScore = (r: number, g: number, b: number, count: number) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;
  const brightness = (r + g + b) / 3 / 255;
  return count * (0.55 + saturation * 0.7 + (1 - Math.abs(brightness - 0.45)) * 0.35);
};

const extractLogoColors = async (imageUrl: string) => {
  const image = new Image();
  image.src = imageUrl;
  await image.decode();

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const size = 48;
  canvas.width = size;
  canvas.height = size;
  context.clearRect(0, 0, size, size);
  context.drawImage(image, 0, 0, size, size);

  const { data } = context.getImageData(0, 0, size, size);
  const colorBuckets = new Map<string, { r: number; g: number; b: number; count: number }>();

  for (let index = 0; index < data.length; index += 4) {
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const alpha = data[index + 3];

    if (alpha < 180) continue;
    if (r > 245 && g > 245 && b > 245) continue;
    if (r < 12 && g < 12 && b < 12) continue;

    // Group nearby shades together so dominant brand colors beat tiny accents.
    const bucketR = Math.round(r / 24) * 24;
    const bucketG = Math.round(g / 24) * 24;
    const bucketB = Math.round(b / 24) * 24;
    const key = `${bucketR}-${bucketG}-${bucketB}`;
    const current = colorBuckets.get(key);

    if (current) {
      current.r += r;
      current.g += g;
      current.b += b;
      current.count += 1;
    } else {
      colorBuckets.set(key, { r, g, b, count: 1 });
    }
  }

  let bestScore = -1;
  let bestColor = { r: 124, g: 58, b: 237 };

  colorBuckets.forEach((bucket) => {
    const averageR = bucket.r / bucket.count;
    const averageG = bucket.g / bucket.count;
    const averageB = bucket.b / bucket.count;
    const score = getColorScore(averageR, averageG, averageB, bucket.count);

    if (score > bestScore) {
      bestScore = score;
      bestColor = { r: averageR, g: averageG, b: averageB };
    }
  });

  const primary = rgbToHex(bestColor.r, bestColor.g, bestColor.b);
  const secondary = mixWithWhite(primary, 0.88);

  return { primary, secondary };
};

const CustomizationPreview = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoName, setLogoName] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [brandName, setBrandName] = useState("YourBrand");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
  );
  const [primaryColor, setPrimaryColor] = useState("#0a0a0a");
  const [secondaryColor, setSecondaryColor] = useState("#f5c517");
  const [primaryHex, setPrimaryHex] = useState("#0a0a0a");
  const [secondaryHex, setSecondaryHex] = useState("#f5c517");
  const brandLabel = logoName ? brandName : "Logo";
  const accentColor = "#ffffff";
  /** Secondary tint for one small accent chip only—rest of mock stays neutral */
  const tone = useMemo(
    () => ({
      accentChipBg: `${secondaryColor}99`,
    }),
    [secondaryColor],
  );

  /** Neutral page canvas */
  const mockPageBackground = useMemo(
    () =>
      `linear-gradient(180deg, rgb(255,255,255) 0%, rgb(248,250,252) 42%, rgb(241,245,249) 100%)`,
    [],
  );

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    const nextPreview = URL.createObjectURL(file);
    setLogoName(file.name);
    setLogoPreview(nextPreview);
    if (!brandName || brandName === "YourBrand") {
      setBrandName(file.name.replace(/\.[^.]+$/, ""));
    }

    try {
      const extractedColors = await extractLogoColors(nextPreview);
      if (extractedColors) {
        setPrimaryColor(extractedColors.primary);
        setPrimaryHex(extractedColors.primary);
        setSecondaryColor(extractedColors.secondary);
        setSecondaryHex(extractedColors.secondary);
      }
    } catch {
      // Keep current colors if the uploaded file can't be sampled.
    }
  };

  const applyHexColor = (
    value: string,
    fallback: string,
    setColor: (value: string) => void,
    setHex: (value: string) => void,
  ) => {
    const normalized = value.trim();
    if (isValidHex(normalized)) {
      const lower = normalized.toLowerCase();
      setColor(lower);
      setHex(lower);
      return;
    }

    setHex(fallback);
  };

  const resetPreview = () => {
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogoName("");
    setLogoPreview("");
    setBrandName("YourBrand");
    setPrimaryColor("#0a0a0a");
    setSecondaryColor("#f5c517");
    setPrimaryHex("#0a0a0a");
    setSecondaryHex("#f5c517");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const steps = [
    { n: 1, label: "Upload" },
    { n: 2, label: "Brand" },
    { n: 3, label: "Colors" },
    { n: 4, label: "ERP" },
  ] as const;

  return (
    <section
      id="live-preview"
      className="relative overflow-hidden border-y border-white/5 bg-[#0A0A0A] py-20 text-neutral-100 lg:py-28"
      aria-labelledby="live-preview-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-1/3 top-[-20%] h-[min(32rem,50vw)] w-[min(32rem,50vw)] rounded-full bg-brand/12 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-[28rem] w-[28rem] rounded-full bg-brand-muted/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-t from-black/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 xl:max-w-[90rem] xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center md:mb-14"
        >
          <p className="mb-3 inline-block rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Try it live
          </p>
          <h2
            id="live-preview-heading"
            className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl md:leading-[1.1]"
          >
            See your brand before you buy in
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-neutral-400 md:text-lg">
            Logo, colours, desktop or mobile. Updates instantly. No guesswork.
          </p>

          <ol className="mx-auto mt-8 grid w-full max-w-2xl list-none grid-cols-2 gap-2.5 p-0 sm:max-w-3xl sm:grid-cols-4 sm:gap-3">
            {steps.map((s) => (
              <li
                key={s.n}
                className="group flex min-w-0 flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] px-2 py-3.5 text-center shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_12px_32px_-12px_rgba(0,0,0,0.5)] transition hover:border-white/[0.16] sm:gap-3 sm:py-4"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-brand to-brand-muted text-sm font-bold tabular-nums text-brand-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_4px_14px_-2px_rgba(245,197,23,0.45)] ring-1 ring-white/25"
                  aria-hidden
                >
                  {s.n}
                </span>
                <span className="px-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-neutral-300 sm:px-0 sm:text-xs sm:tracking-[0.1em]">
                  {s.label}
                </span>
              </li>
            ))}
          </ol>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.28fr)] lg:items-start lg:gap-10">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex min-h-0 w-full min-w-0 flex-col space-y-6 self-start rounded-3xl border border-white/10 bg-neutral-900/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_64px_-20px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl lg:p-7"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Controls</p>
                <p className="mt-1 text-sm font-medium text-neutral-400">Updates the preview live.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0 gap-2 rounded-lg border-neutral-600 bg-neutral-950/80 text-xs font-medium text-neutral-200 hover:border-neutral-500 hover:bg-neutral-900 hover:text-white"
                onClick={resetPreview}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Reset
              </Button>
            </div>

            {/* Logo Upload */}
            <div>
              <Label className="mb-3 block text-sm font-semibold text-neutral-100">1. Logo</Label>
              <p className="mb-3 text-xs font-medium text-neutral-500">PNG/SVG best. We suggest colours from your file.</p>
              <label className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.04] p-6 transition-colors hover:border-brand/35 hover:bg-white/[0.06] focus-within:ring-2 focus-within:ring-brand/25 focus-within:ring-offset-0 focus-within:ring-offset-neutral-950">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                  className="sr-only"
                  onChange={handleUpload}
                  aria-label="Upload logo image"
                />
                {logoName ? (
                  <>
                    {logoPreview ? (
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                        <img src={logoPreview} alt={logoName} className="h-full w-full object-contain p-2" />
                      </div>
                    ) : (
                      <Check size={24} className="text-brand" />
                    )}
                    <span className="text-sm font-medium text-neutral-100">{logoName}</span>
                    <span className="text-xs text-neutral-500">Click to replace logo</span>
                  </>
                ) : (
                  <>
                    <Upload size={24} className="text-neutral-500" />
                    <span className="text-sm text-neutral-400">Click to upload your logo</span>
                    <span className="text-xs text-neutral-500">PNG, JPG, SVG, or WebP. Transparent PNG works best.</span>
                  </>
                )}
              </label>
            </div>

            <div>
              <Label htmlFor="brand-name" className="mb-3 block text-sm font-semibold text-neutral-100">
                2. Brand name
              </Label>
              <p className="mb-3 text-xs font-medium text-neutral-500">Shows in the header if there’s no logo yet.</p>
              <input
                id="brand-name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value || "YourBrand")}
                placeholder="e.g. Acme Studio"
                autoComplete="organization"
                className="w-full rounded-xl border border-white/10 bg-neutral-950/50 px-4 py-3 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Color Picker */}
            <div>
              <Label className="mb-3 block text-sm font-semibold text-neutral-100">3. Colours</Label>
              <p className="mb-3 text-xs font-medium text-neutral-500">Tweak by hand or after upload (6-digit hex).</p>
              <div className="grid gap-3 sm:grid-cols-2 sm:items-stretch">
                <label className="flex min-h-0 flex-col rounded-xl border border-white/10 bg-neutral-950/40 p-3">
                  <span className="mb-2 block text-xs font-medium text-neutral-500">Primary</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => {
                        setPrimaryColor(e.target.value);
                        setPrimaryHex(e.target.value);
                      }}
                      className="h-10 w-12 cursor-pointer rounded-lg border border-white/20 bg-neutral-900 p-1"
                    />
                    <input
                      type="text"
                      value={primaryHex}
                      onChange={(e) => setPrimaryHex(e.target.value)}
                      onBlur={() => applyHexColor(primaryHex, primaryColor, setPrimaryColor, setPrimaryHex)}
                      placeholder="#0a0a0a"
                      className="h-10 flex-1 rounded-lg border border-white/10 bg-neutral-950/80 px-3 text-sm text-neutral-100 outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                </label>
                <label className="flex min-h-0 flex-col rounded-xl border border-white/10 bg-neutral-950/40 p-3">
                  <span className="mb-2 block text-xs font-medium text-neutral-500">Secondary</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => {
                        setSecondaryColor(e.target.value);
                        setSecondaryHex(e.target.value);
                      }}
                      className="h-10 w-12 cursor-pointer rounded-lg border border-white/20 bg-neutral-900 p-1"
                    />
                    <input
                      type="text"
                      value={secondaryHex}
                      onChange={(e) => setSecondaryHex(e.target.value)}
                      onBlur={() => applyHexColor(secondaryHex, secondaryColor, setSecondaryColor, setSecondaryHex)}
                      placeholder="#f5c517"
                      className="h-10 flex-1 rounded-lg border border-white/10 bg-neutral-950/80 px-3 text-sm text-neutral-100 outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                </label>
              </div>
              <p className="mt-3 text-xs font-medium text-neutral-500">
                <span className="text-neutral-200">Primary</span> = main button. <span className="text-neutral-200">Secondary</span> = small chip.
              </p>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-0 w-full min-w-0 flex-col self-start overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-800/50 to-neutral-950/90 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_32px_80px_-24px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-white/5"
          >
            <div className="absolute -right-20 top-8 h-40 w-40 rounded-full bg-brand/10 blur-3xl" aria-hidden />
            <div className="flex min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-white/5 bg-neutral-900/30">
            <div className="flex flex-col bg-transparent px-4 py-4 md:px-5 md:py-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-neutral-100">Device preview</p>
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 shadow-sm shadow-emerald-500/10">
                      Live
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-neutral-500">Toggle desktop vs mobile.</p>
                </div>
                <div
                  role="tablist"
                  aria-label="Preview viewport"
                  className="flex shrink-0 items-center gap-0.5 rounded-full border border-white/10 bg-neutral-950/80 p-0.5 shadow-inner"
                >
                  <button
                    type="button"
                    role="tab"
                    id="preview-tab-desktop"
                    aria-selected={previewMode === "desktop"}
                    aria-controls="preview-panel-desktop"
                    onClick={() => setPreviewMode("desktop")}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      previewMode === "desktop"
                        ? "bg-brand text-brand-foreground shadow-sm shadow-brand/25"
                        : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300",
                    )}
                  >
                    <Monitor size={14} aria-hidden />
                    Desktop
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="preview-tab-mobile"
                    aria-selected={previewMode === "mobile"}
                    aria-controls="preview-panel-mobile"
                    onClick={() => setPreviewMode("mobile")}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      previewMode === "mobile"
                        ? "bg-brand text-brand-foreground shadow-sm shadow-brand/25"
                        : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300",
                    )}
                  >
                    <Smartphone size={14} aria-hidden />
                    Mobile
                  </button>
                </div>
              </div>

              {previewMode === "desktop" ? (
                <div
                  role="tabpanel"
                  id="preview-panel-desktop"
                  aria-labelledby="preview-tab-desktop"
                  className="flex flex-col bg-transparent"
                >
                  <div className="flex items-center gap-2 rounded-t-2xl border border-slate-200/90 bg-white px-3 py-2.5 shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                    <span className="mx-4 h-5 flex-1 rounded-md bg-muted" />
                  </div>

                  <motion.div
                    key="desktop-preview"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col bg-transparent pb-3"
                  >
                    <div
                      className="overflow-hidden rounded-b-[1.35rem] border border-t-0 border-slate-200/90 shadow-sm transition-colors duration-500"
                      style={{ background: mockPageBackground }}
                    >
                      <div
                        className="flex items-center justify-between px-5 py-3 transition-colors duration-500"
                        style={{ backgroundColor: logoPreview ? "#ffffff" : primaryColor }}
                      >
                        {logoPreview ? (
                          <div className="flex h-10 items-center rounded-xl bg-transparent px-1 py-1.5">
                            <img src={logoPreview} alt={brandLabel} className="h-full max-w-[120px] object-contain" />
                          </div>
                        ) : (
                          <span className="text-sm font-bold" style={{ color: accentColor }}>
                            {brandLabel}
                          </span>
                        )}
                        <div className="flex gap-4">
                          {["Home", "Services", "Contact"].map((l) => (
                            <span
                              key={l}
                              className={logoPreview ? "text-xs text-slate-500" : "text-xs text-white/80"}
                            >
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid items-start gap-4 px-5 py-5 md:grid-cols-[1.15fr_0.85fr]">
                        <div className="text-left">
                          <div
                            className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em]"
                            style={{ backgroundColor: tone.accentChipBg, color: primaryColor }}
                          >
                            Built for serious brands
                          </div>
                          <h3 className="mb-3 text-3xl font-bold leading-tight text-slate-900">
                            A polished homepage that feels credible from the first click.
                          </h3>
                          <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-600">
                            Clean structure, modern layout, and responsive sections designed to present your business with clarity.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button
                              size="sm"
                              className="rounded-full px-4 text-xs shadow-md"
                              style={{ backgroundColor: primaryColor, color: accentColor }}
                            >
                              Book a call
                            </Button>
                            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600">
                              Fully responsive
                            </span>
                          </div>
                        </div>

                        <div className="relative flex min-h-[150px] flex-col overflow-hidden rounded-[1.1rem] bg-slate-100 p-3 md:min-h-[160px]">
                          <motion.div
                            className="absolute right-6 top-6 h-24 w-24 rounded-full bg-slate-300/35 blur-2xl"
                            animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.95, 0.55] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                          />
                          <div className="relative z-10 flex flex-1 flex-col justify-start space-y-3">
                            {[0, 1, 2].map((item) => (
                              <motion.div
                                key={item}
                                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                              >
                                <div className="mb-2 h-2 w-20 rounded-full bg-slate-200" />
                                <div className="mb-2 h-2 w-28 rounded-full bg-slate-200" />
                                <div className="h-10 rounded-xl bg-slate-100" />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 px-5 pb-5 md:items-stretch">
                        {["Fast launch", "Modern design", "Built for mobile"].map((item, n) => (
                          <motion.div
                            key={item}
                            className="flex h-full min-h-[5.5rem] flex-col rounded-xl border border-slate-200/80 bg-slate-50 p-4"
                            animate={{ opacity: [0.88, 1, 0.88] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: n * 0.2 }}
                          >
                            <div className="mb-3 h-8 w-8 shrink-0 rounded-lg bg-slate-200/90" />
                            <div className="mt-auto text-xs font-medium leading-snug text-slate-700">{item}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div
                  role="tabpanel"
                  id="preview-panel-mobile"
                  aria-labelledby="preview-tab-mobile"
                  className="flex flex-col bg-transparent"
                >
                <motion.div
                  key="mobile-preview"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col bg-transparent px-4 py-4 md:px-5 md:py-4"
                >
                  <div className="mx-auto w-full max-w-[260px]">
                    <div className="rounded-[2rem] border border-slate-300 bg-slate-950 p-2.5 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.7)]">
                      <div
                        className="overflow-hidden rounded-[1.6rem] transition-colors duration-500"
                        style={{ background: mockPageBackground }}
                      >
                        <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: logoPreview ? "#ffffff" : primaryColor }}>
                          {logoPreview ? (
                            <div className="flex h-7 items-center rounded-lg bg-transparent px-1 py-1">
                              <img src={logoPreview} alt={brandLabel} className="h-full max-w-[84px] object-contain" />
                            </div>
                          ) : (
                            <span className="text-xs font-semibold" style={{ color: accentColor }}>
                              {brandLabel}
                            </span>
                          )}
                          <span
                            className={`h-2 w-2 rounded-full ${logoPreview ? "bg-slate-400" : "bg-white/70"}`}
                          />
                        </div>

                        <div className="px-4 py-5">
                          <div
                            className="mb-3 inline-flex rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
                            style={{ backgroundColor: tone.accentChipBg, color: primaryColor }}
                          >
                            Mobile ready
                          </div>
                          <h4 className="mb-2 text-lg font-bold leading-tight text-slate-900">
                            Professional experience on every screen.
                          </h4>
                          <p className="mb-4 text-xs leading-relaxed text-slate-600">
                            Same brand, same polish, just optimized for thumbs and smaller screens.
                          </p>

                          <Button
                            size="sm"
                            className="mb-4 h-8 w-full rounded-full text-xs"
                            style={{ backgroundColor: primaryColor, color: accentColor }}
                          >
                            Book a call
                          </Button>

                          <div className="space-y-2">
                            {[1, 2, 3].map((item) => (
                              <div key={item} className="rounded-2xl border border-slate-200/80 bg-white p-3">
                                <div className="mb-2 h-2 w-16 rounded-full bg-slate-200" />
                                <div className="h-8 rounded-xl bg-slate-100" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                </div>
              )}
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationPreview;
