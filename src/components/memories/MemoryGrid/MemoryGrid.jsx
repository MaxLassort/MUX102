import MemoryCard from '../MemoryCard'
import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './MemoryGrid.module.css'

export default function MemoryGrid({ memories = [] }) {
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
    </div>
  )
}
