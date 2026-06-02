import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './BottomNavBar.module.css'

const items = [
  { icon: 'home',         label: 'Home',     active: false },
  { icon: 'auto_stories', label: 'Memories', active: true  },
  { icon: 'add_circle',   label: 'Capture',  active: false },
]

export default function BottomNavBar() {
  return (
    <nav className={styles.bar} aria-label="Navigation mobile">
      {items.map((item) => (
        <Tooltip key={item.label} text={POC_TOOLTIP} position="top">
          <a
            href="#"
            className={`${styles.item} ${item.active ? styles.itemActive : ''}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </a>
        </Tooltip>
      ))}
    </nav>
  )
}
