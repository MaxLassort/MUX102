import { useMemo } from 'react'
import { useFetch } from '../../hooks/useFetch.js'
import { listMemories } from '../../services/memoriesService.js'
import { listTags, indexTags } from '../../services/tagsService.js'
import MemoryGrid from '../../components/memories/MemoryGrid'

export default function HomePage() {
  const { data: memories, loading: loadingMemories, error: errorMemories } = useFetch(listMemories)
  const { data: tags, loading: loadingTags, error: errorTags } = useFetch(listTags)

  const tagsById = useMemo(() => (tags ? indexTags(tags) : null), [tags])

  const hydrated = useMemo(() => {
    if (!memories || !tagsById) return []
    return memories.map((m) => ({
      ...m,
      tags: (m.tagIds ?? [])
        .map((id) => tagsById.get(id))
        .filter(Boolean)
        .map((t) => ({ id: t.id, label: t.label })),
    }))
  }, [memories, tagsById])

  const loading = loadingMemories || loadingTags
  const error = errorMemories || errorTags

  if (loading) return <p>Chargement…</p>
  if (error) return <p>Erreur : {error.message}</p>

  return <MemoryGrid memories={hydrated} />
}
