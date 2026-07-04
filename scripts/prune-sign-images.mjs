import { readFileSync, readdirSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SIGNS_DIR = join(ROOT, 'src', 'assets', 'signs')
const VAGMARKEN_PATH = join(ROOT, 'src', 'data', 'vagmarken.ts')

function getVagmarkeIds() {
  const content = readFileSync(VAGMARKEN_PATH, 'utf8')
  return new Set([...content.matchAll(/id: '([^']+)'/g)].map((match) => match[1]))
}

const ids = getVagmarkeIds()
let removed = 0

for (const file of readdirSync(SIGNS_DIR)) {
  const id = file.replace(/\.[^.]+$/, '')
  if (!ids.has(id)) {
    unlinkSync(join(SIGNS_DIR, file))
    removed++
  }
}

const remaining = readdirSync(SIGNS_DIR).length
const missing = [...ids].filter((id) => {
  return !readdirSync(SIGNS_DIR).some((file) => file.replace(/\.[^.]+$/, '') === id)
})

console.log(`Behöll ${remaining} bildfiler i src/assets/signs/`)
console.log(`Tog bort ${removed} bildfiler`)
console.log(`Saknar bild: ${missing.length} vägmärken`)
if (missing.length > 0) {
  console.log(missing.join(', '))
}
