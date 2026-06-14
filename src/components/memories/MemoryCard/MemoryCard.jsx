import { useState } from 'react'
import styles from './MemoryCard.module.css'

/**
 * @param {object} props
 * @param {object} props.memory
 * @param {'default' | 'list'} [props.variant]
 *   `'default'` = vignette empilée (photo en haut, texte dessous).
 *   `'list'`    = rendu horizontal compact (photo à gauche, texte à droite).
 */
export default function MemoryCard({ memory, variant = 'default' }) {
  const { title, excerpt, dateDisplay, photo, tags = [], location } = memory
  const isList = variant === 'list'
  const [liked, setLiked] = useState(false)

  const handlePlayAudio = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleStub = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleLike = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setLiked((v) => !v)
  }

  return (
    <article className={`${styles.card} ${isList ? styles.cardList : ''}`}>
      <div className={styles.media}>
        {photo?.url && <img src={photo.url} alt={photo.alt ?? ''} className={styles.image} />}
        {dateDisplay && <span className={styles.date}>{dateDisplay}</span>}

        <button
          type="button"
          className={`${styles.like} ${liked ? styles.likeActive : ''}`}
          aria-label={
            liked
              ? `Retirer des favoris : ${title}`
              : `Ajouter aux favoris : ${title}`
          }
          aria-pressed={liked}
          onClick={handleLike}
        >
          <span className="material-symbols-outlined">favorite</span>
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

      <footer className={styles.actions}>
        {location ? (
          <span className={styles.location} aria-label={`Lieu : ${location}`}>
            <span className="material-symbols-outlined" aria-hidden="true">
              location_on
            </span>
            <span className={styles.locationLabel}>{location}</span>
          </span>
        ) : (
          <span className={styles.spacer} aria-hidden="true" />
        )}

        <button
          type="button"
          className={styles.actionBtn}
          aria-label={`Écouter : ${title}`}
          onClick={handlePlayAudio}
        >
          <span className="material-symbols-outlined">play_arrow</span>
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          aria-label={`Modifier : ${title}`}
          onClick={handleStub}
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          aria-label={`Partager : ${title}`}
          onClick={handleStub}
        >
          <span className="material-symbols-outlined">share</span>
        </button>
      </footer>
    </article>
  )
}
