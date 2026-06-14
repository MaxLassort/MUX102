/**
 * Sort modes available for the memory list.
 * Exported so the HomePage and SearchBar share the exact same string keys.
 */
export const SORT_MODES = {
  DATE_DESC: 'date_desc',
  DATE_ASC: 'date_asc',
  ALPHA_ASC: 'alpha_asc',
  ALPHA_DESC: 'alpha_desc',
}

/** Default sort: most recent souvenir first. */
export const DEFAULT_SORT = SORT_MODES.DATE_DESC

/**
 * Display labels (FR) keyed by sort mode.
 * Hoisted at module-level so the object reference is stable across renders.
 */
export const SORT_LABELS = {
  [SORT_MODES.DATE_DESC]: 'Date — plus récent',
  [SORT_MODES.DATE_ASC]: 'Date — plus ancien',
  [SORT_MODES.ALPHA_ASC]: 'A → Z',
  [SORT_MODES.ALPHA_DESC]: 'Z → A',
}

/**
 * Material Symbols icon name for each sort mode.
 */
export const SORT_ICONS = {
  [SORT_MODES.DATE_DESC]: 'schedule',
  [SORT_MODES.DATE_ASC]: 'history',
  [SORT_MODES.ALPHA_ASC]: 'sort_by_alpha',
  [SORT_MODES.ALPHA_DESC]: 'sort_by_alpha',
}

/**
 * Ordered list of options for menu rendering.
 * Hoisted (module-level) so the array identity is stable — required by
 * memoised consumers that depend on it.
 */
export const SORT_OPTIONS = [
  SORT_MODES.DATE_DESC,
  SORT_MODES.DATE_ASC,
  SORT_MODES.ALPHA_ASC,
  SORT_MODES.ALPHA_DESC,
]

/**
 * Returns a NEW sorted array of memories (immutable, uses Array.prototype.toSorted).
 * Falls back to the input array unchanged if `mode` is unknown.
 *
 * @template {{ date?: string, title?: string }} T
 * @param {T[]} memories
 * @param {string} mode
 * @returns {T[]}
 */
export function sortMemories(memories, mode) {
  switch (mode) {
    case SORT_MODES.DATE_DESC:
      return memories.toSorted((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    case SORT_MODES.DATE_ASC:
      return memories.toSorted((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))
    case SORT_MODES.ALPHA_ASC:
      return memories.toSorted((a, b) =>
        (a.title ?? '').localeCompare(b.title ?? '', 'fr', { sensitivity: 'base' }),
      )
    case SORT_MODES.ALPHA_DESC:
      return memories.toSorted((a, b) =>
        (b.title ?? '').localeCompare(a.title ?? '', 'fr', { sensitivity: 'base' }),
      )
    default:
      return memories
  }
}
