import { NavLink } from 'react-router-dom'
import { PanelLeft } from 'lucide-react'
import { navGroups, footerItems } from './navItems'
import logo from '../../../assets/brand/piggy-logo-light.svg'
import avatar from '../../../assets/images/avatar.jpg'
import styles from './Sidebar.module.css'

function SidebarLink({ item }) {
  const Icon = item.icon

  return (
    <li>
      <NavLink
        to={item.to}
        end
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <Icon size={20} aria-hidden="true" />
        <span>{item.label}</span>
      </NavLink>
    </li>
  )
}

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Navegação principal">
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="Piggy" />
        </NavLink>
        <button type="button" className={styles.collapseBtn} aria-label="Recolher menu">
          <PanelLeft size={20} />
        </button>
      </header>

      <nav className={styles.nav}>
        {navGroups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h2 className={styles.groupName}>{group.title}</h2>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <SidebarLink key={item.to} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <footer className={styles.footer}>
        <ul className={styles.items}>
          {footerItems.map((item) => (
            <SidebarLink key={item.to} item={item} />
          ))}
        </ul>

        <button type="button" className={styles.profile}>
          <img src={avatar} alt="" className={styles.avatar} />
          <div className={styles.profileInfo}>
            <p className={styles.profileUser}>Davi</p>
            <p className={styles.profilePlan}>Plano pessoal</p>
          </div>
        </button>
      </footer>
    </aside>
  )
}