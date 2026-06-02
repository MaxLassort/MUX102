import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './Fab.module.css'

/** Floating Action Button (desktop only). */
export default function Fab() {
  return (
    <Tooltip text={POC_TOOLTIP} position="top">
      <button
        className={styles.fab}
        aria-label="Capturer un nouveau souvenir"
        type="button"
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </Tooltip>
  )
}
