import { execFile } from 'child_process'
import path from 'path'
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import type { FontKey } from '../../database'

export const runtime = 'nodejs'

// ── Font registration ──────────────────────────────────────────────
const FONTS_DIR = path.join(process.cwd(), 'scripts', 'fonts')

const FONT_FILES: Partial<Record<FontKey, { file: string; family: string }>> = {
  inter:            { file: 'inter.woff2',             family: 'Inter' },
  unifraktur:       { file: 'unifraktur.ttf',          family: 'UnifrakturMaguntia' },
  libreCaslon:      { file: 'libre-caslon.woff2',      family: 'Libre Caslon Text' },
  cinzel:           { file: 'cinzel.woff2',            family: 'Cinzel' },
  cardo:            { file: 'cardo.woff2',             family: 'Cardo' },
  ebGaramond:       { file: 'eb-garamond.woff2',       family: 'EB Garamond' },
  libreBaskerville: { file: 'libre-baskerville.woff2', family: 'Libre Baskerville' },
  bodoniModa:       { file: 'bodoni-moda.woff2',       family: 'Bodoni Moda' },
  clarendon:        { file: 'zilla-slab.woff2',        family: 'Zilla Slab' },
  century:          { file: 'merriweather.woff2',      family: 'Merriweather' },
  timesNewRoman:    { file: 'pt-serif.woff2',          family: 'PT Serif' },
  franklinGothic:   { file: 'libre-franklin.woff2',    family: 'Libre Franklin' },
  johnston:         { file: 'cabin.woff2',             family: 'Cabin' },
  futura:           { file: 'poppins.woff2',           family: 'Poppins' },
  helvetica:        { file: 'inter.woff2',             family: 'Inter' },
  frutiger:         { file: 'source-sans-3.woff2',     family: 'Source Sans 3' },
  arial:            { file: 'roboto.woff2',            family: 'Roboto' },
  verdana:          { file: 'open-sans.woff2',         family: 'Open Sans' },
  sanFrancisco:     { file: 'noto-sans.woff2',         family: 'Noto Sans' },
}

let fontsRegistered = false
function ensureFonts() {
  if (fontsRegistered) return
  for (const entry of Object.values(FONT_FILES)) {
    if (!entry) continue
    const { file, family } = entry
    try {
      GlobalFonts.registerFromPath(path.join(FONTS_DIR, file), family)
    } catch { /* font file missing — will fall back to canvas default */ }
  }
  fontsRegistered = true
}

// ── Canvas rendering ───────────────────────────────────────────────
const PRINT_W   = 576  // dots (80mm @ 203 DPI printable area)
const PAD       = 20   // side padding in px
const CONTENT_W = PRINT_W - PAD * 2

function wrapText(ctx: ReturnType<ReturnType<typeof createCanvas>['getContext']>, text: string, maxW: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxW && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

function renderReceipt(data: {
  fontName: string; fontKey: FontKey; substitute: string
  designer?: string; year: number; sampleText: string
  cpm: number; accuracy: number; durationMs: number
}): { pixels: Uint8ClampedArray; width: number; height: number } {
  ensureFonts()

  const fontFamily = FONT_FILES[data.fontKey]?.family ?? 'sans-serif'
  const durationS  = (data.durationMs / 1000).toFixed(1)

  // ── Measure layout first on a scratch canvas ──────────────────
  const scratch = createCanvas(PRINT_W, 100)
  const sc = scratch.getContext('2d')

  // Measure sample text lines
  sc.font = `18px "${fontFamily}"`
  const sampleLines = wrapText(sc, data.sampleText, CONTENT_W)

  // Calculate total height
  let h = 40           // top padding
  h += 26              // header label
  h += 12              // gap
  h += 2               // separator
  h += 32              // gap
  h += 90              // font name (large)
  h += 16              // gap
  h += 26              // designer · year
  h += 32              // gap
  h += 2               // separator
  h += 20              // gap
  h += sampleLines.length * 28  // sample text lines
  h += 24              // gap
  h += 2               // separator
  h += 20              // gap
  h += 30              // stats
  h += 20              // gap
  h += 2               // separator
  h += 24              // gap
  h += 26              // footer
  h += 60              // bottom feed

  // ── Draw on final canvas ───────────────────────────────────────
  const canvas = createCanvas(PRINT_W, h)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, PRINT_W, h)
  ctx.fillStyle = '#000000'

  let y = 40

  // Header
  ctx.font = '16px "Inter"'
  ctx.textAlign = 'center'
  ctx.fillText('Fig.1  Font History', PRINT_W / 2, y)
  y += 26

  // Separator
  y += 8
  ctx.fillRect(PAD, y, CONTENT_W, 1)
  y += 18

  // Font name (large, in the actual font)
  ctx.font = `bold 64px "${fontFamily}"`
  ctx.textAlign = 'center'
  ctx.fillText(data.fontName, PRINT_W / 2, y + 64)
  y += 90

  // Designer · Year
  ctx.font = '20px "Inter"'
  y += 16
  const meta = [data.designer, String(data.year)].filter(Boolean).join('  ·  ')
  ctx.fillText(meta, PRINT_W / 2, y)
  y += 28

  // Separator
  y += 20
  ctx.fillRect(PAD, y, CONTENT_W, 1)
  y += 20

  // Sample text in the actual font
  ctx.font = `18px "${fontFamily}"`
  ctx.textAlign = 'left'
  for (const line of sampleLines) {
    ctx.fillText(line, PAD, y)
    y += 28
  }
  y += 12

  // Separator
  ctx.fillRect(PAD, y, CONTENT_W, 1)
  y += 16

  // Stats
  ctx.font = '18px "Inter"'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#000'
  ctx.fillText(
    `CPM  ${data.cpm}     Accuracy  ${data.accuracy}%     ${durationS}s`,
    PRINT_W / 2, y + 18
  )
  y += 34

  // Separator
  ctx.fillRect(PAD, y, CONTENT_W, 1)
  y += 24

  // Footer
  ctx.font = '16px "Inter"'
  ctx.textAlign = 'center'
  ctx.fillText('Fig.1', PRINT_W / 2, y)

  const { data: pixels } = ctx.getImageData(0, 0, PRINT_W, h)
  return { pixels, width: PRINT_W, height: h }
}

// ── ESC/POS raster builder ─────────────────────────────────────────
function bitmapToEscPos(pixels: Uint8ClampedArray, width: number, height: number): Buffer {
  const bytesPerRow = Math.ceil(width / 8)
  const bitmap = Buffer.alloc(bytesPerRow * height, 0)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // getImageData returns RGBA
      const offset = (y * width + x) * 4
      const r = pixels[offset]
      const g = pixels[offset + 1]
      const b = pixels[offset + 2]
      const brightness = (r + g + b) / 3
      if (brightness < 200) {
        bitmap[y * bytesPerRow + Math.floor(x / 8)] |= 0x80 >> (x % 8)
      }
    }
  }

  const xL = bytesPerRow & 0xff
  const xH = (bytesPerRow >> 8) & 0xff
  const yL = height & 0xff
  const yH = (height >> 8) & 0xff
  const header = Buffer.from([0x1d, 0x76, 0x30, 0x00, xL, xH, yL, yH])
  return Buffer.concat([header, bitmap])
}

function buildEscPos(data: Parameters<typeof renderReceipt>[0]): Buffer {
  const INIT = Buffer.from([0x1b, 0x40])      // ESC @  initialize
  const CUT  = Buffer.from([0x1d, 0x56, 0x42, 0x00]) // GS V B  full cut

  const { pixels, width, height } = renderReceipt(data)
  const raster = bitmapToEscPos(pixels, width, height)

  return Buffer.concat([INIT, raster, CUT])
}

// ── USB send via Python ────────────────────────────────────────────
function sendToPrinter(escposData: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = path.join(process.cwd(), 'scripts', 'print_receipt.py')
    const child = execFile('python3', [script], (err, _out, stderr) => {
      if (err) reject(new Error(stderr || err.message))
      else resolve()
    })
    child.stdin?.write(escposData)
    child.stdin?.end()
  })
}

// ── Route handler ──────────────────────────────────────────────────
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json()
    const escpos = buildEscPos(body)
    await sendToPrinter(escpos)
    return Response.json({ ok: true })
  } catch (e) {
    console.error('[print]', e)
    return Response.json({ error: String(e) }, { status: 500 })
  }
}
