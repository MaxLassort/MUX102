import { useRef, useState } from 'react'
import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './PhotoCapture.module.css'

export default function PhotoCapture() {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)

  const handlePick = () => inputRef.current?.click()

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target?.result ?? null)
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={styles.frame}>
      {preview ? (
        <div className={styles.previewWrapper}>
          <img src={preview} alt="Aperçu" className={styles.preview} />
          <button
            type="button"
            className={styles.close}
            aria-label="Retirer la photo"
            onClick={handleReset}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <span className={styles.badge}>Instant capturé</span>
        </div>
      ) : (
        <div className={styles.inner}>
          <Tooltip text={POC_TOOLTIP} position="top">
            <button
              type="button"
              className={styles.captureBtn}
              aria-label="Prendre une photo"
              onClick={handlePick}
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </button>
          </Tooltip>
          <p className={styles.hint}>
            Appuyez pour figer une émotion, un lieu, un sourire.
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className={styles.hidden}
        onChange={handleFile}
      />
    </div>
  )
}
