import { writeFileSync } from 'node:fs'

/** Splash light background. */
export const SPLASH_BG = Object.freeze({ r: 0xf8, g: 0xf8, b: 0xf6 })
/** Splash light foreground. */
export const SPLASH_FG = Object.freeze({ r: 0x17, g: 0x18, b: 0x1a })
/** Soft accent from the splash dark loader glow. */
export const SPLASH_ACCENT = Object.freeze({ r: 0x6f, g: 0x86, b: 0xff })

/**
 * Encode a 24-bit Windows BMP. `pixels` is top-to-bottom RGB triples.
 * @param {number} width
 * @param {number} height
 * @param {Uint8Array} pixels
 */
export function encodeBmp24(width, height, pixels) {
  const rowSize = Math.ceil((width * 3) / 4) * 4
  const pixelBytes = rowSize * height
  const buffer = Buffer.alloc(54 + pixelBytes)
  buffer.write('BM', 0, 'ascii')
  buffer.writeUInt32LE(buffer.length, 2)
  buffer.writeUInt32LE(54, 10)
  buffer.writeUInt32LE(40, 14)
  buffer.writeInt32LE(width, 18)
  buffer.writeInt32LE(height, 22)
  buffer.writeUInt16LE(1, 26)
  buffer.writeUInt16LE(24, 28)
  buffer.writeUInt32LE(pixelBytes, 34)
  buffer.writeUInt32LE(2835, 38)
  buffer.writeUInt32LE(2835, 42)

  for (let y = 0; y < height; y += 1) {
    const srcRow = (height - 1 - y) * width * 3
    const destRow = 54 + y * rowSize
    for (let x = 0; x < width; x += 1) {
      const src = srcRow + x * 3
      const dest = destRow + x * 3
      buffer[dest] = pixels[src + 2]
      buffer[dest + 1] = pixels[src + 1]
      buffer[dest + 2] = pixels[src]
    }
  }
  return buffer
}

/**
 * @param {number} width
 * @param {number} height
 * @param {(x: number, y: number) => { r: number; g: number; b: number }} paint
 */
export function renderBmp24(width, height, paint) {
  const pixels = new Uint8Array(width * height * 3)
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const color = paint(x, y)
      const i = (y * width + x) * 3
      pixels[i] = color.r
      pixels[i + 1] = color.g
      pixels[i + 2] = color.b
    }
  }
  return encodeBmp24(width, height, pixels)
}

function fill(target, color) {
  target.r = color.r
  target.g = color.g
  target.b = color.b
}

/**
 * Sidebar for the NSIS wizard (MUI 164×314). Cream panel, dark mark, accent bar.
 * @param {number} [width]
 * @param {number} [height]
 */
export function renderInstallerSidebar(width = 164, height = 314) {
  return renderBmp24(width, height, (x, y) => {
    const color = { ...SPLASH_BG }
    if (x < 6) fill(color, SPLASH_ACCENT)
    const cx = 82
    const cy = 96
    const dx = x - cx
    const dy = y - cy
    if (dx * dx + dy * dy < 34 * 34) fill(color, SPLASH_FG)
    if (dx * dx + dy * dy < 18 * 18) fill(color, SPLASH_BG)
    if (y > 168 && y < 176 && x > 28 && x < 136) fill(color, SPLASH_FG)
    if (y > 188 && y < 194 && x > 44 && x < 120) fill(color, { r: 0x77, g: 0x7a, b: 0x80 })
    return color
  })
}

/**
 * Compact logo strip for the custom page header.
 * @param {number} [width]
 * @param {number} [height]
 */
export function renderInstallerLogo(width = 120, height = 48) {
  return renderBmp24(width, height, (x, y) => {
    const color = { ...SPLASH_BG }
    const cx = 24
    const cy = 24
    const dx = x - cx
    const dy = y - cy
    if (dx * dx + dy * dy < 16 * 16) fill(color, SPLASH_FG)
    if (dx * dx + dy * dy < 8 * 8) fill(color, SPLASH_BG)
    if (x > 48 && x < 112 && y > 18 && y < 30) fill(color, SPLASH_FG)
    return color
  })
}

/**
 * @param {string} filePath
 * @param {Buffer} buffer
 */
export function writeBmpFile(filePath, buffer) {
  writeFileSync(filePath, buffer)
}
