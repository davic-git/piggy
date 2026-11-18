import { diaEMes } from '../../../lib/datas'
import { formatarMoeda } from '../../../lib/dinheiro'
import styles from './GraficoSaldo.module.css'

// O SVG tem um sistema de coordenadas próprio (viewBox). Desenhamos em
// 412 × 210 e o navegador estica para a largura da coluna (width="100%").
const LARGURA = 412
const ALTURA = 210
const AREA = { esquerda: 46, direita: 400, topo: 22, base: 184 }
const PASSO = 400000 // uma linha de grade a cada R$ 4.000 (em centavos)

// Degraus: o saldo fica parado até o dia do lançamento e então pula.
// "H" anda na horizontal até x; "V" anda na vertical até y.
function degraus(pontos, x, y) {
  return pontos
    .map((p, i) => (i === 0 ? `M${x(p.data)} ${y(p.saldo)}` : `H${x(p.data)} V${y(p.saldo)}`))
    .join(' ')
}

function rotuloEixo(centavos) {
  if (centavos === 0) return '0'
  const mil = centavos / 100000
  return `${mil < 0 ? '−' : ''}${Math.abs(mil)} mil`
}

// Cruz bronze nos cantos da área do gráfico (marca da Malha)
function Cruz({ cx, cy }) {
  return <path className={styles.cruz} d={`M${cx - 5} ${cy}H${cx + 5}M${cx} ${cy - 5}V${cy + 5}`} />
}

export default function GraficoSaldo({ historico, projecao, hoje, inicio, fim }) {
  const saldos = [...historico, ...projecao].map((p) => p.saldo)
  const yMax = Math.ceil(Math.max(...saldos) / PASSO) * PASSO
  const yMin = Math.min(0, Math.floor(Math.min(...saldos) / PASSO) * PASSO)

  // Escalas: convertem dado (data, centavos) em posição no desenho.
  const x = (data) =>
    AREA.esquerda + ((data - inicio) / (fim - inicio)) * (AREA.direita - AREA.esquerda)
  const y = (saldo) => AREA.base - ((saldo - yMin) / (yMax - yMin)) * (AREA.base - AREA.topo)

  const grade = []
  for (let v = yMin; v <= yMax; v += PASSO) grade.push(v)

  const marcasX = [1, 8, 15, 22].map((d) => new Date(inicio.getFullYear(), inicio.getMonth(), d))

  const linhaReal = degraus(historico, x, y)
  const areaReal = `${linhaReal} V${y(0)} H${x(historico[0].data)} Z`
  const linhaPrevista = degraus(projecao, x, y)

  const pontoHoje = historico[historico.length - 1]
  const pontoFinal = projecao[projecao.length - 1]

  // O gráfico é uma imagem para o leitor de tela: a frase resume o que ele mostra.
  const descricao =
    `Saldo diário: começou em ${formatarMoeda(historico[0].saldo)}, ` +
    `está em ${formatarMoeda(pontoHoje.saldo)} hoje, ${diaEMes(hoje)}, ` +
    `e a previsão é ${formatarMoeda(pontoFinal.saldo)} em ${diaEMes(fim)}.`

  return (
    <svg
      className={styles.grafico}
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      width="100%"
      role="img"
      aria-label={descricao}
    >
      {grade.map((v) => (
        <g key={v}>
          <path className={styles.grade} d={`M${AREA.esquerda} ${y(v)}H${AREA.direita}`} />
          <text className={styles.eixo} x={AREA.esquerda - 8} y={y(v) + 4} textAnchor="end">
            {rotuloEixo(v)}
          </text>
        </g>
      ))}

      {marcasX.map((data, i) => (
        <text
          key={data.getTime()}
          className={styles.eixo}
          x={x(data)}
          y={ALTURA - 6}
          textAnchor={i === 0 ? 'start' : 'middle'}
        >
          {i === 0 ? diaEMes(data) : data.getDate()}
        </text>
      ))}
      <text className={styles.eixo} x={AREA.direita} y={ALTURA - 6} textAnchor="end">
        {diaEMes(fim)}
      </text>

      <path className={styles.area} d={areaReal} />
      <path className={styles.linhaReal} d={linhaReal} />
      {/* Tracejado é reservado para projeção (spec 11) */}
      <path className={styles.linhaPrevista} d={linhaPrevista} />

      <path className={styles.hoje} d={`M${x(hoje)} ${AREA.topo}V${AREA.base}`} />
      <text className={styles.hojeTexto} x={x(hoje) + 6} y={AREA.topo + 10}>hoje</text>
      <circle className={styles.pontoHoje} cx={x(hoje)} cy={y(pontoHoje.saldo)} r="5" />
      <circle className={styles.pontoFinal} cx={x(fim)} cy={y(pontoFinal.saldo)} r="4" />

      <Cruz cx={AREA.esquerda} cy={AREA.topo} />
      <Cruz cx={AREA.direita} cy={AREA.topo} />
      <Cruz cx={AREA.esquerda} cy={AREA.base} />
      <Cruz cx={AREA.direita} cy={AREA.base} />
    </svg>
  )
}
