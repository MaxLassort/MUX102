/**
 * Generic fetch helper for the static JSON "API" served from /public/api/.
 *
 * Uses import.meta.env.BASE_URL so requests resolve correctly both in dev
 * (served from "/") and in production on GitHub Pages (served from "/MUX102/").
 */

const BASE = import.meta.env.BASE_URL // ends with "/"

export class ApiError extends Error {
  constructor(message, { status, url } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.url = url
  }
}

/**
 * Fetch a JSON resource from the mock API.
 * @param {string} path  Relative path under /api/, e.g. "memories.json"
 * @param {object} [options]
 * @param {AbortSignal} [options.signal]
 * @returns {Promise<any>}
 */
export async function apiGet(path, { signal } = {}) {
  const url = `${BASE}api/${path}`
  const res = await fetch(url, { signal })
  if (!res.ok) {
    throw new ApiError(`GET ${url} failed (${res.status})`, {
      status: res.status,
      url,
    })
  }
  return res.json()
}
