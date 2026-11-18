import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle({ className }) {
  const { theme, alternar } = useTheme()
  const escuro = theme === 'dark'

  return (
    <button
      type="button"
      className={className}
      onClick={alternar}
      aria-pressed={escuro}
      aria-label={
        escuro
          ? 'Tema escuro ativo. Mudar para o claro'
          : 'Tema claro ativo. Mudar para o escuro'
      }
    >
      {escuro ? 'Tema escuro' : 'Tema claro'}
    </button>
  )
}
