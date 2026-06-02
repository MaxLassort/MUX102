import { apiGet } from './api.js'

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string | null} avatarUrl
 * @property {number} memoryCount
 */

/**
 * @returns {Promise<User>}
 */
export async function getCurrentUser({ signal } = {}) {
  const data = await apiGet('user.json', { signal })
  return data.user
}
