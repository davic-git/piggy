import styles from './Toast.module.css'

// Só desenha. Quem decide quando aparecer e quando sumir é quem usa.
export default function Toast({ mensagem, acao, onAcao }) {
  return (
    <div className={styles.toast} role="status">
      <span>{mensagem}</span>
      {acao && (
        <button type="button" className={styles.acao} onClick={onAcao}>
          {acao}
        </button>
      )}
    </div>
  )
}
