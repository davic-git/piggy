import { useEffect } from 'react'
import { Plus, Bell, Globe } from 'lucide-react'
import styles from './Header.module.css'

// Provisório: a conversa com o Patrono ainda não existe.
// Fica fora do componente para não ser recriada a cada render.
function abrirPatrono() {
  console.info('Patrono: conversa ainda não implementada')
}

// Provisório: depois vem dos dados de verdade.
const NOTIFICACOES = 3

function PatronoBar() {
  // Atalho Ctrl K (ou Cmd K no Mac) em qualquer lugar da página
  useEffect(() => {
    function aoApertarTecla(evento) {
      if ((evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === 'k') {
        evento.preventDefault() // senão o navegador abre a busca dele
        abrirPatrono()
      }
    }

    window.addEventListener('keydown', aoApertarTecla)
    return () => window.removeEventListener('keydown', aoApertarTecla)
  }, [])

  return (
    <button
      type="button"
      className={styles.patrono}
      onClick={abrirPatrono}
      aria-label="Pergunte ao Patrono, atalho Ctrl K"
      aria-keyshortcuts="Control+K"
    >
      <Plus size={16} strokeWidth={2.5} className={styles.patronoIcon} aria-hidden="true" />
      <span className={styles.patronoLabel}>Pergunte ao Patrono</span>
      <kbd className={styles.kbd}>Ctrl K</kbd>
    </button>
  )
}

export default function Header({ title, subtitle, actions }) {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <PatronoBar />

      <div className={styles.actions}>
        {actions}

        <button
          type="button"
          className={styles.iconBtn}
          aria-label={NOTIFICACOES > 0 ? `Notificações, ${NOTIFICACOES} novas` : 'Notificações'}
        >
          <Bell size={19} strokeWidth={1.8} aria-hidden="true" />
          {NOTIFICACOES > 0 && (
            <span className={styles.badge} aria-hidden="true">{NOTIFICACOES}</span>
          )}
        </button>

        <button type="button" className={styles.iconBtn} aria-label="Idioma: Português (Brasil)">
          <Globe size={19} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
