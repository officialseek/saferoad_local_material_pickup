/**
 * Vägmärkesbilder från src/assets/signs/.
 * Laddas lazy per bild – undviker att alla ~200 bilder hämtas vid sidladdning.
 */
const imageModules = import.meta.glob<string>('../assets/signs/*.{png,jpg,jpeg,svg,webp}', {
  import: 'default',
  query: '?url',
})

function filenameToId(path: string): string {
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/\.[^.]+$/, '')
}

const pathById: Record<string, string> = Object.fromEntries(
  Object.keys(imageModules).map((path) => [filenameToId(path), path]),
)

export async function loadSignImage(id: string): Promise<string | undefined> {
  const path = pathById[id]
  if (!path) return undefined
  return imageModules[path]()
}

export function hasSignImage(id: string): boolean {
  return id in pathById
}
