import MemoryCard from '../MemoryCard'
import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './MemoryGrid.module.css'

/**
 * @param {object} props
 * @param {Array} props.memories
 * @param {'classic' | 'wide'} [props.layout]
 *   `'classic'` (default) renders every card at the same compact size.
 *   `'wide'` forces every card to span the full width of the grid.
 */
export default function MemoryGrid({ memories = [], layout = 'classic' }) {
  const forceWide = layout === 'wide'

  return (
    <div className={styles.grid}>
      {memories.map((memory) => (
        <div key={memory.id} className={forceWide ? styles.wide : undefined}>
          <Tooltip text={POC_TOOLTIP} position="top">
            <MemoryCard memory={memory} variant={forceWide ? 'list' : 'default'} />
          </Tooltip>
        </div>
      ))}
    </div>
  )
}
