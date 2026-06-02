import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './TopAppBar.module.css'

export default function TopAppBar() {
  return (
    <header className={styles.bar}>
      <Link to="/" className={styles.brand} aria-label="milleSouvenir — Accueil">
        <img src={logo} alt="" className={styles.logo} />
        <span className={styles.brandText}>Mille Souvenirs</span>
      </Link>

      <Tooltip text={POC_TOOLTIP} position="bottom">
        <button className={styles.account} aria-label="Compte">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </Tooltip>
    </header>
  )
}
