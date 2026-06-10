import { Link, NavLink } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './TopAppBar.module.css'

// Real routes (navigable) — active state driven by current URL.
const NAV_LINKS = [
  { to: '/',     label: 'Souvenirs', end: true  },
  { to: '/new',  label: 'Nouveau',   end: false },
  { to: '/about', label: 'À propos', end: false },
]

// Fake menu entries — non-functional, flagged with the POC tooltip.
const DISABLED_LINKS = [
  { label: 'Albums' },
  { label: 'Famille' },
  { label: 'Partages' },
]

export default function TopAppBar() {
  return (
    <header className={styles.bar}>
      <Link to="/" className={styles.brand} aria-label="milleSouvenir — Accueil">
        <img src={logo} alt="" className={styles.logo} />
        <span className={styles.brandText}>Mille Souvenirs</span>
      </Link>

      <nav className={styles.nav} aria-label="Navigation principale">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {DISABLED_LINKS.map((link) => (
          <Tooltip key={link.label} text={POC_TOOLTIP} position="bottom">
            <button
              type="button"
              className={`${styles.link} ${styles.linkDisabled}`}
              aria-disabled="true"
              disabled
            >
              {link.label}
            </button>
          </Tooltip>
        ))}
      </nav>

      <Tooltip text={POC_TOOLTIP} position="bottom">
        <button className={styles.account} aria-label="Compte">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </Tooltip>
    </header>
  )
}
