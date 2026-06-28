#!/usr/bin/env node
/**
 * Downloads WOFF2 font files from jsDelivr (@fontsource) to scripts/fonts/.
 * Run once: node scripts/setup-fonts.mjs
 */
import { createWriteStream, mkdirSync, existsSync } from 'fs'
import { pipeline } from 'stream/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FONTS_DIR = path.join(__dirname, 'fonts')
mkdirSync(FONTS_DIR, { recursive: true })

// { filename: jsDelivr CDN URL }
const FONTS = {
  'inter.woff2':             'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff2',
  'unifraktur.woff2':        'https://cdn.jsdelivr.net/npm/@fontsource/unifraktur-maguntia/files/unifraktur-maguntia-latin-400-normal.woff2',
  'libre-caslon.woff2':      'https://cdn.jsdelivr.net/npm/@fontsource/libre-caslon-text/files/libre-caslon-text-latin-400-normal.woff2',
  'cinzel.woff2':            'https://cdn.jsdelivr.net/npm/@fontsource/cinzel/files/cinzel-latin-400-normal.woff2',
  'cardo.woff2':             'https://cdn.jsdelivr.net/npm/@fontsource/cardo/files/cardo-latin-400-normal.woff2',
  'eb-garamond.woff2':       'https://cdn.jsdelivr.net/npm/@fontsource/eb-garamond/files/eb-garamond-latin-400-normal.woff2',
  'libre-baskerville.woff2': 'https://cdn.jsdelivr.net/npm/@fontsource/libre-baskerville/files/libre-baskerville-latin-400-normal.woff2',
  'bodoni-moda.woff2':       'https://cdn.jsdelivr.net/npm/@fontsource/bodoni-moda/files/bodoni-moda-latin-400-normal.woff2',
  'zilla-slab.woff2':        'https://cdn.jsdelivr.net/npm/@fontsource/zilla-slab/files/zilla-slab-latin-400-normal.woff2',
  'merriweather.woff2':      'https://cdn.jsdelivr.net/npm/@fontsource/merriweather/files/merriweather-latin-400-normal.woff2',
  'pt-serif.woff2':          'https://cdn.jsdelivr.net/npm/@fontsource/pt-serif/files/pt-serif-latin-400-normal.woff2',
  'libre-franklin.woff2':    'https://cdn.jsdelivr.net/npm/@fontsource/libre-franklin/files/libre-franklin-latin-400-normal.woff2',
  'cabin.woff2':             'https://cdn.jsdelivr.net/npm/@fontsource/cabin/files/cabin-latin-400-normal.woff2',
  'poppins.woff2':           'https://cdn.jsdelivr.net/npm/@fontsource/poppins/files/poppins-latin-400-normal.woff2',
  'source-sans-3.woff2':     'https://cdn.jsdelivr.net/npm/@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff2',
  'roboto.woff2':            'https://cdn.jsdelivr.net/npm/@fontsource/roboto/files/roboto-latin-400-normal.woff2',
  'open-sans.woff2':         'https://cdn.jsdelivr.net/npm/@fontsource/open-sans/files/open-sans-latin-400-normal.woff2',
  'noto-sans.woff2':         'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff2',
}

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`)
  await pipeline(res.body, createWriteStream(dest))
}

for (const [filename, url] of Object.entries(FONTS)) {
  const dest = path.join(FONTS_DIR, filename)
  if (existsSync(dest)) {
    console.log(`skip  ${filename}`)
    continue
  }
  process.stdout.write(`dl    ${filename} ... `)
  try {
    await download(url, dest)
    console.log('ok')
  } catch (e) {
    console.log(`FAIL: ${e.message}`)
  }
}

console.log('done')
