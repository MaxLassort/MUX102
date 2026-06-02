import { useEffect, useState } from 'react'

/**
 * Minimal data-fetching hook for the mock API.
 *
 * @template T
 * @param {(opts: { signal: AbortSignal }) => Promise<T>} fetcher
 * @param {any[]} [deps]
 * @returns {{ data: T | null, loading: boolean, error: Error | null }}
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetcher({ signal: controller.signal })
      .then((result) => {
        if (!controller.signal.aborted) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (controller.signal.aborted || err.name === 'AbortError') return
        setError(err)
        setLoading(false)
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}
