import { useEffect, useState } from 'react'
import { loadSignImage } from '../data/signImages'

export function useSignImage(materialId: string): string | undefined {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    let cancelled = false

    loadSignImage(materialId).then((resolved) => {
      if (!cancelled) setUrl(resolved)
    })

    return () => {
      cancelled = true
    }
  }, [materialId])

  return url
}
