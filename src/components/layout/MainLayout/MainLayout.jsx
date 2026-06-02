import { Outlet } from 'react-router-dom'
import TopAppBar from '../TopAppBar'
import BottomNavBar from '../BottomNavBar'
import Fab from '../Fab'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <TopAppBar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <BottomNavBar />
      <Fab />
    </div>
  )
}