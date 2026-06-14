import { useCallback, useMemo, useState } from 'react'
import { useFetch } from '../../hooks/useFetch.js'
import { listMemories } from '../../services/memoriesService.js'
import { listTags, indexTags } from '../../services/tagsService.js'
import SearchBar from '../../components/memories/SearchBar'
import CategoryChips from '../../components/memories/CategoryChips'
import MemoryGrid from '../../components/memories/MemoryGrid'
import Paginator from '../../components/common/Paginator'
import { DEFAULT_SORT, sortMemories } from '../../utils/sort.js'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { data: memories, loading: loadingMemories, error: errorMemories } = useFetch(listMemories)
  const { data: tags, loading: loadingTags, error: errorTags } = useFetch(listTags)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  // `false` = toutes les cards en mode classique, `true` = toutes en mode wide.
  const [listView, setListView] = useState(false)
  // `null` = pas de filtre, sinon l'id du tag sélectionné.
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [sort, setSort] = useState(DEFAULT_SORT)

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

  const filtered = useMemo(() => {
    if (!selectedCategoryId) return hydrated
    return hydrated.filter((m) => m.tagIds?.includes(selectedCategoryId))
  }, [hydrated, selectedCategoryId])

  const sorted = useMemo(() => sortMemories(filtered, sort), [filtered, sort])

  // Réinitialise la page courante lorsque la catégorie change — état dérivé pendant
  // le rendu plutôt qu'un useEffect (rerender-derived-state-no-effect).
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, totalPages)

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, safePage, pageSize])

  const handleCategoryChange = useCallback((nextId) => {
    setSelectedCategoryId(nextId)
    setPage(1)
  }, [])

  const handleSortChange = useCallback((nextSort) => {
    setSort(nextSort)
    setPage(1)
  }, [])

  const loading = loadingMemories || loadingTags
  const error = errorMemories || errorTags

  if (loading) return <p>Chargement…</p>
  if (error) return <p>Erreur : {error.message}</p>

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mes souvenirs</h1>
        <p className={styles.subtitle}>
          Retrouvez vos moments précieux, classés et toujours à portée de main.
        </p>
      </header>
      <SearchBar
        listView={listView}
        onListViewChange={setListView}
        sort={sort}
        onSortChange={handleSortChange}
      />
      <CategoryChips
        categories={tags ?? []}
        selectedId={selectedCategoryId}
        onChange={handleCategoryChange}
      />
      <MemoryGrid memories={paginated} layout={listView ? 'wide' : 'classic'} />
      <Paginator
        page={safePage}
        pageSize={pageSize}
        totalItems={sorted.length}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
      />
    </div>
  )
}
