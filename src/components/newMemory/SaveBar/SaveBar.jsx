import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './SaveBar.module.css'

export default function SaveBar({ onSave }) {
  return (
    <div className={styles.bar}>
      <Tooltip text={POC_TOOLTIP} position="top">
        <button type="button" className={styles.btn} onClick={onSave}>
          <span className="material-symbols-outlined">auto_awesome</span>
          <span>Enregistrer le souvenir</span>
        </button>
      </Tooltip>
    </div>
  )
}
