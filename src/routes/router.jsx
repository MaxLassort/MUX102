import { createHashRouter } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import NewMemoryPage from '../pages/NewMemoryPage'
import NotFoundPage from '../pages/NotFoundPage'

// HashRouter is used so the app works out of the box on GitHub Pages
// (no need for SPA 404 redirect tricks).
const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'new', element: <NewMemoryPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router
