import { Routes, Route, useLocation } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Header from './components/layout/Header/Header'
import { navGroups, footerItems } from './components/layout/Sidebar/navItems'
import Dashboard from './pages/Dashboard/Dashboard'

// Provisório para as páginas que ainda não migramos
function EmConstrucao() {
  const { pathname } = useLocation()
  const todos = [...navGroups.flatMap((grupo) => grupo.items), ...footerItems]
  const item = todos.find((i) => i.to === pathname)

  return <Header title={item?.label ?? 'Página'} subtitle="Em construção" />
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<EmConstrucao />} />
      </Route>
    </Routes>
  )
}
