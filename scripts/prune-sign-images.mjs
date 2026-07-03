import { readFileSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SIGNS_DIR = join(ROOT, 'public', 'signs')
const VAGMARKEN_PATH = join(ROOT, 'src', 'data', 'vagmarken.ts')
const SIGN_IMAGES_PATH = join(ROOT, 'src', 'data', 'signImages.ts')

function getVagmarkeIds() {
  const content = readFileSync(VAGMARKEN_PATH, 'utf8')
  return [...content.matchAll(/id: '([^']+)'/g)].map((match) => match[1])
}

function getSignImages() {
  const content = readFileSync(SIGN_IMAGES_PATH, 'utf8')
  const images = {}
  for (const match of content.matchAll(/'([^']+)': '([^']+)'/g)) {
    images[match[1]] = match[2]
  }
  return images
}

const ids = new Set(getVagmarkeIds())
const images = getSignImages()

const kept = {}
for (const id of ids) {
  if (images[id]) kept[id] = images[id]
}

const lines = [
  '/** Bildsökvägar hämtade från Transportstyrelsen. Genereras via scripts/download-sign-images.mjs */',
  'export const signImages: Record<string, string> = {',
]

for (const [id, path] of Object.entries(kept).sort(([a], [b]) => a.localeCompare(b))) {
  lines.push(`  '${id}': '${path}',`)
}

lines.push('}', '')

writeFileSync(SIGN_IMAGES_PATH, lines.join('\n'), 'utf8')

const keptPaths = new Set(Object.values(kept))
let removed = 0

for (const file of readdirSync(SIGNS_DIR)) {
  const filePath = `/signs/${file}`
  if (!keptPaths.has(filePath)) {
    unlinkSync(join(SIGNS_DIR, file))
    removed++
  }
}

console.log(`Behöll ${Object.keys(kept).length} bildmappningar`)
console.log(`Tog bort ${removed} bildfiler`)
console.log(`Saknar bild: ${[...ids].filter((id) => !kept[id]).length} vägmärken`)
