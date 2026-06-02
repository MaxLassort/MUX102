import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch.js'
import { listTags } from '../../services/tagsService.js'
import BackHeader from '../../components/newMemory/BackHeader'
import StepHeader from '../../components/newMemory/StepHeader'
import PhotoCapture from '../../components/newMemory/PhotoCapture'
import VoiceRecorder from '../../components/newMemory/VoiceRecorder'
import MemoryTextArea from '../../components/newMemory/MemoryTextArea'
import TagPicker from '../../components/newMemory/TagPicker'
import SaveBar from '../../components/newMemory/SaveBar'
import styles from './NewMemoryPage.module.css'

export default function NewMemoryPage() {
  const { data: tags } = useFetch(listTags)
  const [text, setText] = useState('')
  const [selectedTagIds, setSelectedTagIds] = useState([])

  const toggleTag = (id) =>
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  return (
    <div className={styles.page}>
      <BackHeader title="Nouveau Souvenir" eyebrow="Mémoire #42" />

      <section className={styles.section}>
        <StepHeader number="01" title="Capturer l'instant" />
        <PhotoCapture />
      </section>

      <section className={styles.section}>
        <StepHeader number="02" title="Raconter l'histoire" />
        <div className={styles.story}>
          <VoiceRecorder />
          <MemoryTextArea value={text} onChange={setText} />
        </div>
      </section>

      <section className={styles.section}>
        <StepHeader number="03" title="Mots-clés" />
        <TagPicker
          tags={tags ?? []}
          selected={selectedTagIds}
          onToggle={toggleTag}
        />
      </section>

      <SaveBar />
    </div>
  )
}
