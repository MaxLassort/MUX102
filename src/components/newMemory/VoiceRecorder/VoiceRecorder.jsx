import { useState } from 'react'
import Tooltip from '../../common/Tooltip'
import { POC_TOOLTIP } from '../../../utils/constants.js'
import styles from './VoiceRecorder.module.css'

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false)

  return (
    <div className={styles.card}>
      <Tooltip text={POC_TOOLTIP} position="top">
        <button
          type="button"
          className={`${styles.btn} ${recording ? styles.btnRecording : ''}`}
          aria-label={recording ? 'Arrêter l\'enregistrement' : 'Enregistrer une mémoire vocale'}
          aria-pressed={recording}
          onClick={() => setRecording((r) => !r)}
        >
          <span className="material-symbols-outlined">
            {recording ? 'stop' : 'mic'}
          </span>
        </button>
      </Tooltip>
      <div className={styles.text}>
        <p className={styles.title}>Mémoire vocale</p>
        <p className={styles.subtitle}>
          Laissez votre voix porter l'émotion de ce moment.
        </p>
      </div>
    </div>
  )
}
