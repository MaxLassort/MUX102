import styles from './StepHeader.module.css'

export default function StepHeader({ number, title }) {
  return (
    <div className={styles.row}>
      <span className={styles.badge}>{number}</span>
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}
