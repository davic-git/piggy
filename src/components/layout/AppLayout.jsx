import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import styles from './AppLayout.module.css'

// Moldura de todas as páginas: sidebar fixa + área que rola.
// <Outlet /> é o "buraco" onde o React Router coloca a página da rota atual.
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
