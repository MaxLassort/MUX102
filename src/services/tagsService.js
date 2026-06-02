import { apiGet } from './api.js'

/**
 * @typedef {Object} Tag
 * @property {string} id
 * @property {string} label
 * @property {string} slug
 * @property {string} icon    Material Symbols Outlined icon name
 * @property {"primary" | "secondary" | "tertiary"} color
 */

/**
 * @returns {Promise<Tag[]>}
 */
export async function listTags({ signal } = {}) {
  const data = await apiGet('tags.json', { signal })
  return data.tags
}

/**
 * Build a Map<id, Tag> for fast lookups when hydrating memories.
 * @param {Tag[]} tags
 */
export function indexTags(tags) {
  return new Map(tags.map((t) => [t.id, t]))
}
