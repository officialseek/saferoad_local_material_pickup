import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SIGNS_DIR = join(ROOT, 'public', 'signs')
const BASE = 'https://www.transportstyrelsen.se'

const CATEGORY_SLUGS = [
  'varningsmarken',
  'vajningspliktsmarken',
  'forbudsmarken',
  'pabudsmarken',
  'anvisningsmarken',
  'lokaliseringsmarken-for-upplysning-om-allmanna-inrattningar-med-mera',
  'lokaliseringsmarken-for-upplysning-om-serviceanlaggningar-med-mera',
  'vagmarkeringar',
  'symboler',
  'tillaggstavlor',
]

function codeToId(code) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '-')
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchText(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`)
  return response.text()
}

function extractSignPageUrls(html, categorySlug) {
  const prefix = `/sv/vagtrafik/trafikregler-och-vagmarken/vagmarken/${categorySlug}/`
  const matches = html.matchAll(new RegExp(`href="(${prefix}[^"#?]+/)"`, 'g'))
  const urls = new Set()
  for (const match of matches) {
    const path = match[1]
    if (path !== prefix) urls.add(`${BASE}${path}`)
  }
  return [...urls]
}

function extractSignData(html) {
  const flat = html.replace(/\s+/g, ' ')
  const codeMatch = flat.match(/PageCode">([^<]+)</)
  const imageMatch = flat.match(
    /href="(\/globalassets\/global\/vag\/[^"]+\.(?:png|jpg|jpeg|webp))"/i,
  )
  if (!codeMatch || !imageMatch) return null
  return {
    code: codeMatch[1].trim(),
    imagePath: imageMatch[1],
  }
}

async function downloadImage(url, destPath) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status} for image ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  writeFileSync(destPath, buffer)
}

async function main() {
  mkdirSync(SIGNS_DIR, { recursive: true })

  const signPageUrls = new Set()

  console.log('Samlar länkar från kategorisidor...')
  for (const slug of CATEGORY_SLUGS) {
    const categoryUrl = `${BASE}/sv/vagtrafik/trafikregler-och-vagmarken/vagmarken/${slug}/`
    try {
      const html = await fetchText(categoryUrl)
      const pages = extractSignPageUrls(html, slug)
      pages.forEach((url) => signPageUrls.add(url))
      console.log(`  ${slug}: ${pages.length} sidor`)
    } catch (error) {
      console.warn(`  ${slug}: misslyckades – ${error.message}`)
    }
    await sleep(200)
  }

  console.log(`\nHämtar ${signPageUrls.size} vägmärkesbilder...`)

  const images = {}
  const failed = []
  let downloaded = 0
  let skipped = 0

  for (const pageUrl of signPageUrls) {
    try {
      const html = await fetchText(pageUrl)
      const data = extractSignData(html)
      if (!data) {
        failed.push({ pageUrl, reason: 'saknar kod eller bild' })
        continue
      }

      const id = codeToId(data.code)
      const extension = data.imagePath.split('.').pop()?.toLowerCase() ?? 'png'
      const destPath = join(SIGNS_DIR, `${id}.${extension}`)
      const publicPath = `/signs/${id}.${extension}`

      if (existsSync(destPath) && images[id]) {
        skipped++
        continue
      }

      const imageUrl = `${BASE}${data.imagePath}`
      await downloadImage(imageUrl, destPath)
      images[id] = publicPath
      downloaded++
      process.stdout.write(`\r  ${downloaded + skipped}/${signPageUrls.size} – ${data.code}`)
      await sleep(150)
    } catch (error) {
      failed.push({ pageUrl, reason: error.message })
    }
  }

  console.log(`\n\nKlart: ${downloaded} nedladdade, ${skipped} redan fanns, ${failed.length} misslyckades`)

  const outputPath = join(ROOT, 'src', 'data', 'signImages.ts')
  const lines = [
    '/** Bildsökvägar hämtade från Transportstyrelsen. Genereras via scripts/download-sign-images.mjs */',
    'export const signImages: Record<string, string> = {',
  ]

  for (const [id, path] of Object.entries(images).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  '${id}': '${path}',`)
  }

  lines.push('}', '')

  writeFileSync(outputPath, lines.join('\n'), 'utf8')
  console.log(`Skrev ${Object.keys(images).length} bildmappningar -> ${outputPath}`)

  if (failed.length > 0) {
    const failLog = join(ROOT, 'scripts', 'sign-image-failures.json')
    writeFileSync(failLog, JSON.stringify(failed, null, 2), 'utf8')
    console.log(`Misslyckade hämtningar loggade i ${failLog}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
