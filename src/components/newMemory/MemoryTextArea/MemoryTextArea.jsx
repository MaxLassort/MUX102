import styles from './MemoryTextArea.module.css'

export default function MemoryTextArea({ value, onChange }) {
  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor="memory-text">
        Ou écrivez quelques mots...
      </label>
      <textarea
        id="memory-text"
        className={styles.textarea}
        placeholder="C'était un après-midi paisible, le soleil filtrait à travers les rideaux..."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
