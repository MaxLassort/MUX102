import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './Paginator.module.css'

const DEFAULT_PAGE_SIZES = [8, 12, 24]

/**
 * Generic paginator with page-size selector and page navigation.
 *
 * @param {object} props
 * @param {number} props.page              Current 1-based page index.
 * @param {number} props.pageSize          Current page size.
 * @param {number} props.totalItems        Total number of items.
 * @param {(page: number) => void} props.onPageChange
 * @param {(size: number) => void} props.onPageSizeChange
 * @param {number[]} [props.pageSizeOptions]
 */
export default function Paginator({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const firstItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1
  const lastItem = Math.min(safePage * pageSize, totalItems)

  const isFirst = safePage === 1
  const isLast = safePage === totalPages

  return (
    <div className={styles.bar}>
      <label className={styles.sizeGroup}>
        <span className={styles.sizeLabel}>Par page</span>
        <select
          className={styles.select}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <span className={styles.range}>
        {firstItem}–{lastItem} sur {totalItems}
      </span>

      <div className={styles.nav}>
        <Tooltip text={POC_TOOLTIP} position="top">
          <button
            type="button"
            className={styles.btn}
            onClick={() => onPageChange(1)}
            disabled={isFirst}
            aria-label="Première page"
          >
            <span className="material-symbols-outlined">first_page</span>
          </button>
        </Tooltip>
        <Tooltip text={POC_TOOLTIP} position="top">
          <button
            type="button"
            className={styles.btn}
            onClick={() => onPageChange(safePage - 1)}
            disabled={isFirst}
            aria-label="Page précédente"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
        </Tooltip>

        <span className={styles.pageInfo}>
          {safePage} / {totalPages}
        </span>

        <Tooltip text={POC_TOOLTIP} position="top">
          <button
            type="button"
            className={styles.btn}
            onClick={() => onPageChange(safePage + 1)}
            disabled={isLast}
            aria-label="Page suivante"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </Tooltip>
        <Tooltip text={POC_TOOLTIP} position="top">
          <button
            type="button"
            className={styles.btn}
            onClick={() => onPageChange(totalPages)}
            disabled={isLast}
            aria-label="Dernière page"
          >
            <span className="material-symbols-outlined">last_page</span>
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
