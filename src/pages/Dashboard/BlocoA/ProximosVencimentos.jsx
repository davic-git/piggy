import { Link } from 'react-router-dom'
import { Check, ChevronRight } from 'lucide-react'
import Valor from '../../../components/ui/Valor'
import { diasAte, prazoRelativo, mesCurto } from '../../../lib/datas'
import { somar } from '../calculos'
import styles from './ProximosVencimentos.module.css'

const LIMITE = 5 // spec 3.2: até 5 itens

// Este componente não guarda estado nenhum: recebe a lista pronta e AVISA
// o pai quando alguém clica em "pago" (onMarcarPago). Quem decide o que
// acontece é o BlocoA. Dados descem por props; eventos sobem por funções.
export default function ProximosVencimentos({ vencimentos, hoje, onMarcarPago }) {
  // Ordenar por data já põe os vencidos no topo (são as datas mais antigas).
  // [...lista] copia antes de ordenar: .sort() altera o array original,
  // e props nunca devem ser alteradas.
  const ordenados = [...vencimentos].sort((a, b) => a.data - b.data)
  const visiveis = ordenados.slice(0, LIMITE)

  return (
    <div className={styles.coluna}>
      <div className={styles.topo}>
        <h2 className={styles.titulo}>Próximos vencimentos</h2>
        <p className={styles.periodo}>30 dias</p>
      </div>

      {visiveis.length === 0 ? (
        <p className={styles.vazio}>Nenhum vencimento nos próximos 30 dias.</p>
      ) : (
        <ul className={styles.lista}>
          {visiveis.map((v) => {
            const vencido = diasAte(v.data, hoje) < 0

            return (
              // key estável (o id), não o índice: a lista muda quando um item é pago.
              <li key={v.id} className={`${styles.item} ${vencido ? styles.vencido : ''}`}>
                <div className={styles.data}>
                  <p className={styles.dia}>{v.data.getDate()}</p>
                  <p className={styles.mes}>{mesCurto(v.data)}</p>
                </div>

                <div className={styles.info}>
                  <p className={styles.nome}>{v.nome}</p>
                  <p className={styles.meta}>{v.origem} · {prazoRelativo(v.data, hoje)}</p>
                </div>

                <Valor centavos={v.centavos} className={styles.valor} />

                <button
                  type="button"
                  className={styles.pagar}
                  onClick={() => onMarcarPago(v.id)}
                  aria-label={`Marcar ${v.nome} como pago`}
                >
                  <span className={styles.check}>
                    <Check size={14} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <div className={styles.rodape}>
        <div>
          <p className={styles.totalRotulo}>Total em 30 dias</p>
          <Valor centavos={somar(vencimentos)} className={styles.total} />
        </div>
        {vencimentos.length > 0 && (
          <Link to="/recurrent" className={styles.link}>
            Ver todos os {vencimentos.length}
            <ChevronRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  )
}
