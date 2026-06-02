import MemoryCard from '../MemoryCard'
import NewMemoryCard from '../NewMemoryCard'
import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './MemoryGrid.module.css'

export default function MemoryGrid({ memories = [], onCreate }) {
  return (
    <div className={styles.grid}>
      {memories.map((memory) => (
        <div
          key={memory.id}
          className={memory.layout === 'wide' ? styles.wide : undefined}
        >
          <Tooltip text={POC_TOOLTIP} position="top">
            <MemoryCard memory={memory} />
          </Tooltip>
        </div>
      ))}
      <div>
        <Tooltip text={POC_TOOLTIP} position="top">
          <NewMemoryCard onClick={onCreate} />
        </Tooltip>
      </div>
    </div>
  )
}
