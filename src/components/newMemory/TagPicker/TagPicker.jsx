import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './TagPicker.module.css'

export default function TagPicker({ tags = [], selected = [], onToggle }) {
  return (
    <div className={styles.row}>
      {tags.map((tag) => {
        const isSelected = selected.includes(tag.id)
        return (
          <button
            key={tag.id}
            type="button"
            className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`}
            aria-pressed={isSelected}
            onClick={() => onToggle?.(tag.id)}
          >
            {tag.icon ? (
              <span className="material-symbols-outlined">{tag.icon}</span>
            ) : null}
            <span>{tag.label}</span>
          </button>
        )
      })}
      <Tooltip text={POC_TOOLTIP} position="top">
        <button type="button" className={`${styles.chip} ${styles.chipAdd}`}>
          <span className="material-symbols-outlined">add</span>
          <span>Ajouter</span>
        </button>
      </Tooltip>
    </div>
  )
}
