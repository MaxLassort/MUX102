import { useCallback } from 'react'
import styles from './CategoryChips.module.css'

/**
 * @typedef {Object} CategoryOption
 * @property {string} id
 * @property {string} label
 * @property {string} [icon]                      Material Symbols Outlined icon name
 * @property {"primary" | "secondary" | "tertiary"} [color]
 */

/**
 * Horizontal row of selectable category chips.
 * Single-selection: clicking the active chip clears the filter.
 *
 * Controlled component — parent owns `selectedId` state.
 *
 * @param {object} props
 * @param {CategoryOption[]} props.categories
 * @param {string | null} props.selectedId        `null` = no filter active.
 * @param {(next: string | null) => void} props.onChange
 * @param {string} [props.allLabel="Tous"]        Label for the reset chip.
 */
export default function CategoryChips({
  categories,
  selectedId,
  onChange,
  allLabel = 'Tous',
}) {
  const handleSelect = useCallback(
    (id) => {
      // Toggle off if user re-clicks the active chip.
      onChange?.(selectedId === id ? null : id)
    },
    [onChange, selectedId],
  )

  return (
    <div
      className={styles.row}
      role="listbox"
      aria-label="Filtrer par catégorie"
      aria-orientation="horizontal"
    >
      <button
        type="button"
        role="option"
        aria-selected={selectedId === null}
        className={`${styles.chip} ${selectedId === null ? styles.active : ''}`}
        onClick={() => onChange?.(null)}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          apps
        </span>
        <span className={styles.label}>{allLabel}</span>
      </button>

      {categories.map((cat) => {
        const isActive = selectedId === cat.id
        const colorClass = cat.color ? styles[`color_${cat.color}`] : ''
        return (
          <button
            key={cat.id}
            type="button"
            role="option"
            aria-selected={isActive}
            className={`${styles.chip} ${colorClass} ${isActive ? styles.active : ''}`}
            onClick={() => handleSelect(cat.id)}
          >
            {cat.icon ? (
              <span className="material-symbols-outlined" aria-hidden="true">
                {cat.icon}
              </span>
            ) : null}
            <span className={styles.label}>{cat.label}</span>
          </button>
        )
      })}
    </div>
  )
}
