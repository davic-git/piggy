import { Link } from 'react-router-dom'
import { TriangleAlert, Info, CircleCheck, X } from 'lucide-react'
import TextoRico from '../../../components/ui/TextoRico'
import CartaoPatrono from './CartaoPatrono'
import styles from './PedeAtencao.module.css'

const MAXIMO = 3
const ORDEM = { grave: 0, aviso: 1 } // mais grave primeiro (spec 3.3)

export default function PedeAtencao({
  alertas,
  pagos,
  dispensados,
  onDispensar,
  onMarcarPago,
  sugestao,
  onDispensarSugestao,
}) {
  // Spec: um alerta só sai da tela quando o usuário dispensa.
  const ativos = alertas
    .filter((a) => !dispensados.includes(a.id))
    .sort((a, b) => ORDEM[a.nivel] - ORDEM[b.nivel])

  const visiveis = ativos.slice(0, MAXIMO)
  const excedente = ativos.length - visiveis.length

  return (
    <div className={styles.coluna}>
      <div className={styles.topo}>
        <h2 className={styles.titulo}>Pede atenção</h2>
        {ativos.length > 0 && (
          <span className={styles.contador}>
            {ativos.length} {ativos.length === 1 ? 'alerta' : 'alertas'}
          </span>
        )}
      </div>

      {visiveis.length === 0 ? (
        <p className={styles.vazio}>Nada pendente.</p>
      ) : (
        <ul className={styles.lista}>
          {visiveis.map((alerta) => (
            <Alerta
              key={alerta.id}
              alerta={alerta}
              // Resolvido = o vencimento ligado a ele foi pago. Continua na tela
              // marcado "Resolvido" até ser dispensado (spec 3.3).
              resolvido={Boolean(alerta.vencimentoId) && pagos.includes(alerta.vencimentoId)}
              onDispensar={() => onDispensar(alerta.id)}
              onMarcarPago={onMarcarPago}
            />
          ))}
        </ul>
      )}

      {excedente > 0 && (
        <p className={styles.excedente}>+{excedente} alertas em Notificações</p>
      )}

      {sugestao && <CartaoPatrono sugestao={sugestao} onDispensar={onDispensarSugestao} />}
    </div>
  )
}

// Um componente pequeno no MESMO arquivo: só faz sentido dentro do PedeAtencao.
function Alerta({ alerta, resolvido, onDispensar, onMarcarPago }) {
  const grave = alerta.nivel === 'grave' && !resolvido
  const Icone = resolvido ? CircleCheck : grave ? TriangleAlert : Info

  return (
    <li className={`${styles.alerta} ${grave ? styles.grave : ''}`}>
      <span className={styles.icone}>
        <Icone size={17} strokeWidth={1.8} aria-hidden="true" />
      </span>

      <div className={styles.corpo}>
        <p className={styles.alertaTitulo}>{alerta.titulo}</p>
        <p className={styles.detalhe}>
          <TextoRico partes={alerta.detalhe} />
        </p>

        {resolvido ? (
          <p className={styles.resolvido}>Resolvido</p>
        ) : alerta.vencimentoId ? (
          // Ação que muda dado -> <button>
          <button type="button" className={styles.acao} onClick={() => onMarcarPago(alerta.vencimentoId)}>
            {alerta.acao}
          </button>
        ) : (
          // Ação que leva para outra página -> <Link> (é navegação, não ação)
          <Link to={alerta.destino} className={styles.acao}>
            {alerta.acao}
          </Link>
        )}
      </div>

      <button
        type="button"
        className={styles.dispensar}
        onClick={onDispensar}
        aria-label={`Dispensar alerta: ${alerta.titulo}`}
      >
        <X size={16} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </li>
  )
}
