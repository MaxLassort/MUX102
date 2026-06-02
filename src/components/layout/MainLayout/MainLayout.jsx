import { Outlet, useLocation } from 'react-router-dom'
import TopAppBar from '../TopAppBar'
import BottomNavBar from '../BottomNavBar'
import Fab from '../Fab'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  const location = useLocation()
  const hideFab = location.pathname === '/new'

  return (
    <div className={styles.layout}>
      <TopAppBar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <BottomNavBar />
      {hideFab ? null : <Fab />}
    </div>
  )
}