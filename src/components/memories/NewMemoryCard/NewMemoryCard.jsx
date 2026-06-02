import styles from './NewMemoryCard.module.css'

export default function NewMemoryCard({ onClick }) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <span className={styles.icon}>
        <span className="material-symbols-outlined">add</span>
      </span>
      <span className={styles.title}>Nouveau Souvenir</span>
      <span className={styles.subtitle}>Capturer un moment</span>
    </button>
  )
}
