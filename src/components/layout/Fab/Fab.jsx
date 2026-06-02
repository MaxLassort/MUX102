import { Link } from 'react-router-dom'
import styles from './Fab.module.css'

/** Floating Action Button — opens the new memory page. */
export default function Fab() {
  return (
    <Link
      to="/new"
      className={styles.fab}
      aria-label="Capturer un nouveau souvenir"
    >
      <span className="material-symbols-outlined">add</span>
    </Link>
  )
}
