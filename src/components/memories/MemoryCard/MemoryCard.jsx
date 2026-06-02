import styles from './MemoryCard.module.css'

export default function MemoryCard({ memory }) {
  const { title, excerpt, dateDisplay, photo, tags = [] } = memory

  return (
    <article className={styles.card}>
      <div
        className={styles.media}
        style={photo?.aspectRatio ? { aspectRatio: photo.aspectRatio.replace('/', ' / ') } : undefined}
      >
        {photo?.url && <img src={photo.url} alt={photo.alt ?? ''} className={styles.image} />}
        {dateDisplay && <span className={styles.date}>{dateDisplay}</span>}
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
