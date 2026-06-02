import { useMemo, useState } from 'react'
import { useFetch } from '../../hooks/useFetch.js'
import { listMemories } from '../../services/memoriesService.js'
import { listTags, indexTags } from '../../services/tagsService.js'
import SearchBar from '../../components/memories/SearchBar'
import MemoryGrid from '../../components/memories/MemoryGrid'
import Paginator from '../../components/common/Paginator'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { data: memories, loading: loadingMemories, error: errorMemories } = useFetch(listMemories)
  const { data: tags, loading: loadingTags, error: errorTags } = useFetch(listTags)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)

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

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return hydrated.slice(start, start + pageSize)
  }, [hydrated, page, pageSize])

  const loading = loadingMemories || loadingTags
  const error = errorMemories || errorTags

  if (loading) return <p>Chargement…</p>
  if (error) return <p>Erreur : {error.message}</p>

  return (
    <div className={styles.page}>
      <SearchBar />
      <MemoryGrid memories={paginated} />
      <Paginator
        page={page}
        pageSize={pageSize}
        totalItems={hydrated.length}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
      />
    </div>
  )
}
