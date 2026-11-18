import styles from './Button.module.css'

// variant: 'secondary' (contorno, padrão) ou 'primary' (o único botão cheio da tela)
// icon / iconRight: um ícone do lucide-react, antes ou depois do texto
export default function Button({
  variant = 'secondary',
  icon: Icon,
  iconRight: IconRight,
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={16} strokeWidth={2} aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && <IconRight size={16} strokeWidth={1.8} aria-hidden="true" />}
    </button>
  )
}
