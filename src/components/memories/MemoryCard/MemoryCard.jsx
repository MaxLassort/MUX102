import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './MemoryCard.module.css'

export default function MemoryCard({ memory }) {
  const { title, excerpt, dateDisplay, photo, tags = [] } = memory

  const handlePlayAudio = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <article className={styles.card}>
      <div
        className={styles.media}
        style={photo?.aspectRatio ? { aspectRatio: photo.aspectRatio.replace('/', ' / ') } : undefined}
      >
        {photo?.url && <img src={photo.url} alt={photo.alt ?? ''} className={styles.image} />}
        {dateDisplay && <span className={styles.date}>{dateDisplay}</span>}
      
          <button
            type="button"
            className={styles.audio}
            aria-label={`Écouter le souvenir : ${title}`}
            onClick={handlePlayAudio}
          >
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
      
      </div>

      <div className={styles.body}>
        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag.id} className={styles.tag}>
                {tag.label}
              </li>
            ))}
          </ul>
        )}
        <h3 className={styles.title}>{title}</h3>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
      </div>
    </article>
  )
}
