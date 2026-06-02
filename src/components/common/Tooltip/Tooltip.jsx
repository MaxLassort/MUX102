import styles from './Tooltip.module.css'

/**
 * Wraps any element to display a small tooltip on hover/focus.
 * Used across the POC to flag non-functional UI elements.
 *
 * @param {object} props
 * @param {string} props.text         The message to display.
 * @param {React.ReactNode} props.children
 * @param {"top" | "bottom"} [props.position]
 */
export default function Tooltip({ text, children, position = 'bottom' }) {
  return (
    <span className={styles.wrapper}>
      {children}
      <span
        className={`${styles.bubble} ${styles[position]}`}
        role="tooltip"
      >
        {text}
      </span>
    </span>
  )
}
