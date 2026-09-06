/* تولید آیکون PWA بدون وابستگی: ۵۱۲ و ۱۹۲ پیکسل، سبک «ستارهٔ طلایی در شب» */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    raw[y * (1 + size * 4)] = 0; // filter none
    rgba.copy(raw, y * (1 + size * 4) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

function inStar(x, y, cx, cy, outer, inner, rot = Math.PI / 8) {
  const dx = x - cx, dy = y - cy;
  const r = Math.hypot(dx, dy);
  if (r > outer || r < 1) return false;
  const ang = Math.atan2(dy, dx) + rot;
  // ۱۶ ضلعی ستاره‌ای: ۸ گوشهٔ بیرونی و ۸ درونی
  const n = 16;
  let inside = false;
  const px = [], py = [];
  for (let i = 0; i < n; i++) {
    const rr = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI * 2) / n;
    px.push(cx + rr * Math.cos(a));
    py.push(cy + rr * Math.sin(a));
  }
  for (let i = 0, j = n - 1; i < n; j = i++) {
    if (py[i] > y !== py[j] > y && x < ((px[j] - px[i]) * (y - py[i])) / (py[j] - py[i]) + px[i]) inside = !inside;
  }
  return inside;
}

function make(size, path, maskable = false) {
  const rgba = Buffer.alloc(size * size * 4);
  const cx = size / 2, cy = size / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const nx = (x - cx) / cx, ny = (y - cy) / cy;
      const dist = Math.hypot(nx, ny);
      const ang = Math.atan2(ny, nx);
      // پس‌زمینه: گرادیان بنفش شب
      const t = y / size;
      let R = 0.09 + t * 0.05 + 0.06;
      let G = 0.05 + t * 0.04 + 0.05;
      let B = 0.19 + t * 0.08 + 0.14;
      let A = 255;
      // حلقهٔ طلایی (برای آیکون معمولی)
      if (!maskable && dist > 0.72 && dist < 0.78) { R = 0.93; G = 0.79; B = 0.44; }
      if (!maskable && dist > 0.78) { A = 0; }
      // ستاره
      const starR = maskable ? size * 0.27 : size * 0.33;
      const starInner = maskable ? size * 0.115 : size * 0.14;
      if (inStar(x, y, cx, cy, starR, starInner, ang)) {
        const g = 0.2 + 0.8 * (1 - dist);
        R = 0.98; G = 0.85 + 0.1 * g; B = 0.55;
      }
      // هالهٔ درخشان دور ستاره
      if (!(R > 0.9 && G > 0.8)) {
        const glow = Math.max(0, 1 - dist / 0.45);
        R = Math.min(1, R + 0.12 * glow * glow);
        G = Math.min(1, G + 0.08 * glow * glow);
      }
      rgba[i] = Math.round(R * 255);
      rgba[i + 1] = Math.round(G * 255);
      rgba[i + 2] = Math.round(B * 255);
      rgba[i + 3] = A;
    }
  }
  mkdirSync("assets/icons", { recursive: true });
  writeFileSync(path, encodePng(size, rgba));
  console.log("wrote", path, size, "x", size);
}

make(512, "assets/icons/icon-512.png");
make(192, "assets/icons/icon-192.png");
make(512, "assets/icons/icon-maskable-512.png", true);
make(192, "assets/icons/icon-maskable-192.png", true);
