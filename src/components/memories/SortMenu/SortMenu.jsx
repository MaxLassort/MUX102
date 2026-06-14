import { useCallback, useEffect, useRef, useState } from 'react'
import { SORT_OPTIONS, SORT_LABELS, SORT_ICONS } from '../../../utils/sort.js'
import styles from './SortMenu.module.css'

/**
 * Sort menu: a button that toggles a small popover with sort options.
 * Controlled — parent owns the `value` (current sort mode).
 *
 * @param {object} props
 * @param {string} props.value
 * @param {(next: string) => void} props.onChange
 */
export default function SortMenu({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  // Close on outside click + Escape. Uses a single listener attached only when
  // the menu is open (client-event-listeners).
  useEffect(() => {
    if (!open) return

    const handlePointer = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const handleSelect = useCallback(
    (mode) => {
      onChange?.(mode)
      setOpen(false)
    },
    [onChange],
  )

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="material-symbols-outlined">sort</span>
        <span className={styles.triggerLabel}>Trier</span>
        <span
          className={`material-symbols-outlined ${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {open ? (
        <ul
          className={styles.menu}
          role="listbox"
          aria-label="Choisir un ordre de tri"
        >
          {SORT_OPTIONS.map((mode) => {
            const isActive = mode === value
            return (
              <li key={mode} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                  onClick={() => handleSelect(mode)}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {SORT_ICONS[mode]}
                  </span>
                  <span className={styles.optionLabel}>{SORT_LABELS[mode]}</span>
                  {isActive ? (
                    <span
                      className={`material-symbols-outlined ${styles.check}`}
                      aria-hidden="true"
                    >
                      check
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
