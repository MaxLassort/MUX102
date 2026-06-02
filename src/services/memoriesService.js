import { apiGet } from './api.js'

/**
 * @typedef {Object} MemoryPhoto
 * @property {string} url
 * @property {string} alt
 * @property {string} aspectRatio
 *
 * @typedef {Object} Memory
 * @property {string} id
 * @property {number} number
 * @property {string} title
 * @property {string} story
 * @property {string} excerpt
 * @property {string} date          ISO date (yyyy-mm-dd)
 * @property {string} dateDisplay   Human-friendly date as shown in UI
 * @property {MemoryPhoto} photo
 * @property {null | { url: string, duration: number }} audio
 * @property {string[]} tagIds
 * @property {"default" | "wide"} layout
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} authorId
 */

/**
 * @returns {Promise<Memory[]>}
 */
export async function listMemories({ signal } = {}) {
  const data = await apiGet('memories.json', { signal })
  return data.memories
}

/**
 * @param {string} id
 * @returns {Promise<Memory | undefined>}
 */
export async function getMemory(id, { signal } = {}) {
  const all = await listMemories({ signal })
  return all.find((m) => m.id === id)
}
