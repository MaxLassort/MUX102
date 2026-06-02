import { Outlet, Link } from 'react-router-dom'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>milleSouvenir</Link>
        <nav className={styles.nav}>
          <Link to="/">Accueil</Link>
          <Link to="/about">À propos</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <small>© {new Date().getFullYear()} milleSouvenir</small>
      </footer>
    </div>
  )
}
