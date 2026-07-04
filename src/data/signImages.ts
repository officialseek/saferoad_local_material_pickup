/**
 * Vägmärkesbilder från src/assets/signs/.
 * Nya filer i mappen inkluderas automatiskt via Vite glob-import.
 */
const imageModules = import.meta.glob<string>('../assets/signs/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})

function filenameToId(path: string): string {
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/\.[^.]+$/, '')
}

export const signImages: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [filenameToId(path), url]),
)
