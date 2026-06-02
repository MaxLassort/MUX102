import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  return (
    <div className={styles.row}>
      <Tooltip text={POC_TOOLTIP} position="bottom">
        <label className={styles.search}>
          <span className={`material-symbols-outlined ${styles.icon}`}>search</span>
          <input
            type="search"
            className={styles.input}
            placeholder="Rechercher un souvenir..."
            aria-label="Rechercher un souvenir"
          />
        </label>
      </Tooltip>

      <Tooltip text={POC_TOOLTIP} position="bottom">
        <button type="button" className={styles.filters}>
          <span className="material-symbols-outlined">tune</span>
          <span className={styles.filtersLabel}>Filtres</span>
        </button>
      </Tooltip>
    </div>
  )
}
