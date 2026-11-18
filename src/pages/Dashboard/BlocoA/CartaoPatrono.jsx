import { Plus } from 'lucide-react'
import TextoRico from '../../../components/ui/TextoRico'
import styles from './CartaoPatrono.module.css'

// Provisório: a conversa com o Patrono ainda não existe.
function verConta() {
  console.info('Patrono: "Ver a conta" ainda não implementado')
}

// Spec 3.4: o Patrono separa fato de sugestão. Por isso o rótulo "Sugestão"
// e a faixa bronze: é a única cor da tela reservada só para ele.
export default function CartaoPatrono({ sugestao, onDispensar }) {
  return (
    <section className={styles.cartao} aria-label="Sugestão do Patrono">
      <div className={styles.faixa} />
      <div className={styles.conteudo}>
        <div className={styles.topo}>
          <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
          <p className={styles.rotulo}>Sugestão</p>
          <p className={styles.assinatura}>Patrono</p>
        </div>

        <p className={styles.texto}>
          <TextoRico partes={sugestao.texto} />
        </p>

        <div className={styles.acoes}>
          <button type="button" className={styles.botao} onClick={verConta}>
            Ver a conta
          </button>
          <button type="button" className={styles.dispensar} onClick={onDispensar}>
            Dispensar
          </button>
        </div>
      </div>
    </section>
  )
}
