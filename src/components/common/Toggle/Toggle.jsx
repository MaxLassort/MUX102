import styles from './Toggle.module.css'

/**
 * Two-option segmented switch (Material 3 style).
 * The colored pill slides between the left and right option.
 * Controlled component: parent owns the `checked` state.
 *   - `checked = false` → left option active
 *   - `checked = true`  → right option active
 *
 * @param {object} props
 * @param {boolean} props.checked
 * @param {(next: boolean) => void} props.onChange
 * @param {React.ReactNode} [props.leftIcon]   Content rendered in the left slot.
 * @param {React.ReactNode} [props.rightIcon]  Content rendered in the right slot.
 * @param {string} [props.leftLabel]           Accessible label for the left slot.
 * @param {string} [props.rightLabel]          Accessible label for the right slot.
 * @param {boolean} [props.disabled]
 */
export default function Toggle({
  checked,
  onChange,
  leftIcon,
  rightIcon,
  leftLabel = 'Option 1',
  rightLabel = 'Option 2',
  disabled = false,
}) {
  const select = (next) => {
    if (disabled || next === checked) return
    onChange?.(next)
  }

  return (
    <div
      className={`${styles.segmented} ${disabled ? styles.disabled : ''}`}
      role="group"
    >
      <span
        className={`${styles.thumb} ${checked ? styles.thumbRight : styles.thumbLeft}`}
        aria-hidden="true"
      />
      <button
        type="button"
        className={`${styles.option} ${!checked ? styles.optionActive : ''}`}
        aria-pressed={!checked}
        aria-label={leftLabel}
        disabled={disabled}
        onClick={() => select(false)}
      >
        {leftIcon}
      </button>
      <button
        type="button"
        className={`${styles.option} ${checked ? styles.optionActive : ''}`}
        aria-pressed={checked}
        aria-label={rightLabel}
        disabled={disabled}
        onClick={() => select(true)}
      >
        {rightIcon}
      </button>
    </div>
  )
}
