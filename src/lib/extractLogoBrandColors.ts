/** Shared with `CustomizationPreview` and package onboarding — homepage color sampling + hex validation. */

export const isValidHex = (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value);

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
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

export async function extractLogoColors(imageUrl: string): Promise<{ primary: string; secondary: string } | null> {
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

  colorBuckets.forEach(bucket => {
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
}

/** Same behavior as the homepage live-preview panel (normalize or revert on blur). */
export function applyHexColor(
  value: string,
  fallback: string,
  setColor: (value: string) => void,
  setHex: (value: string) => void,
): void {
  const normalized = value.trim();
  if (isValidHex(normalized)) {
    const lower = normalized.toLowerCase();
    setColor(lower);
    setHex(lower);
    return;
  }

  setHex(fallback);
}
