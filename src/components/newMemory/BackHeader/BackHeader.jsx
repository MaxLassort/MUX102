import { useNavigate } from 'react-router-dom'
import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './BackHeader.module.css'

export default function BackHeader({ title, eyebrow }) {
  const navigate = useNavigate()

  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.back}
          aria-label="Retour"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className={styles.titles}>
          <h1 className={styles.title}>{title}</h1>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        </div>
      </div>
      <Tooltip text={POC_TOOLTIP} position="bottom">
        <button type="button" className={styles.guide}>
          <span className="material-symbols-outlined">auto_stories</span>
          <span className={styles.guideLabel}>Guide</span>
        </button>
      </Tooltip>
    </header>
  )
}
