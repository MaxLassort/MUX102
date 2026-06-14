import Tooltip from '../../common/Tooltip'
import Toggle from '../../common/Toggle'
import SortMenu from '../SortMenu'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import { DEFAULT_SORT } from '../../../utils/sort.js'
import styles from './SearchBar.module.css'

/**
 * @param {object} props
 * @param {boolean} [props.listView]
 * @param {(next: boolean) => void} [props.onListViewChange]
 * @param {string} [props.sort]
 * @param {(next: string) => void} [props.onSortChange]
 */
export default function SearchBar({
  listView = false,
  onListViewChange,
  sort = DEFAULT_SORT,
  onSortChange,
}) {
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

      <SortMenu value={sort} onChange={onSortChange} />

      <Toggle
        checked={listView}
        onChange={onListViewChange}
        leftIcon={<span className="material-symbols-outlined">grid_view</span>}
        rightIcon={<span className="material-symbols-outlined">view_list</span>}
        leftLabel="Vue grille"
        rightLabel="Vue liste"
      />
    </div>
  )
}
