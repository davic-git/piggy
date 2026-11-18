import { useState } from 'react'
import { Eye, EyeOff, Info } from 'lucide-react'
import Valor from '../../../components/ui/Valor'
import { useValoresOcultos } from '../../../hooks/useValoresOcultos'
import { diaEMes } from '../../../lib/datas'
import { calcularPrevisao, projetarSaldo } from '../calculos'
import GraficoSaldo from './GraficoSaldo'
import styles from './SaldoPrevisto.module.css'

export default function SaldoPrevisto({ saldo, historico, vencimentos, receitas, hoje, inicio, fim }) {
  const { ocultos, alternar } = useValoresOcultos()

  // Estados que só esta coluna usa ficam aqui, não no BlocoA.
  const [verTabela, setVerTabela] = useState(false)
  const [verConta, setVerConta] = useState(false)

  const { totalVencimentos, totalReceitas, previsto } = calcularPrevisao({ saldo, vencimentos, receitas })
  const projecao = projetarSaldo({ saldo, hoje, fim, vencimentos, receitas })
  const negativo = previsto < 0

  return (
    <div className={styles.coluna}>
      <div className={styles.topo}>
        <p className={styles.rotulo}>Saldo em conta</p>
        <button
          type="button"
          className={styles.olho}
          onClick={alternar}
          aria-pressed={ocultos}
          aria-label="Ocultar valores"
        >
          {ocultos ? <EyeOff size={19} strokeWidth={1.8} /> : <Eye size={19} strokeWidth={1.8} />}
        </button>
      </div>

      {/* O ÚNICO número de destaque da tela (spec 11) */}
      <Valor centavos={saldo} className={styles.destaque} />

      <div className={styles.previsto}>
        <p className={styles.previstoRotulo}>Previsto em {diaEMes(fim)}</p>
        <Valor centavos={previsto} className={`${styles.previstoValor} ${negativo ? styles.alerta : ''}`} />
        <span className={styles.diferenca}>
          <Valor centavos={previsto - saldo} sinal /> até lá
        </span>
      </div>

      {verConta && (
        <dl className={styles.conta} id="como-calculamos">
          <div><dt>Saldo em conta</dt><dd><Valor centavos={saldo} /></dd></div>
          <div><dt>− Vencimentos até {diaEMes(fim)}</dt><dd><Valor centavos={totalVencimentos} /></dd></div>
          <div><dt>+ Receitas previstas</dt><dd><Valor centavos={totalReceitas} /></dd></div>
          <div className={styles.contaTotal}><dt>= Previsto</dt><dd><Valor centavos={previsto} /></dd></div>
        </dl>
      )}

      {/* Renderização condicional: mostra um OU outro */}
      {verTabela ? (
        <TabelaSaldo historico={historico} projecao={projecao} />
      ) : (
        <GraficoSaldo historico={historico} projecao={projecao} hoje={hoje} inicio={inicio} fim={fim} />
      )}

      <div className={styles.rodape}>
        <button
          type="button"
          className={styles.linkBotao}
          onClick={() => setVerConta((v) => !v)}
          aria-expanded={verConta}
          aria-controls="como-calculamos"
        >
          <Info size={16} strokeWidth={1.8} aria-hidden="true" />
          <span>Como calculamos</span>
        </button>
        <button type="button" className={styles.linkBotao} onClick={() => setVerTabela((v) => !v)}>
          <span>{verTabela ? 'Ver em gráfico' : 'Ver em tabela'}</span>
        </button>
      </div>
    </div>
  )
}

// Versão em tabela do gráfico (spec 3.1): mesma informação, acessível
// para quem usa leitor de tela ou prefere ler números.
function TabelaSaldo({ historico, projecao }) {
  const linhas = [
    ...historico.map((p) => ({ ...p, tipo: 'Real' })),
    ...projecao.slice(1).map((p) => ({ ...p, tipo: 'Previsto' })), // o 1º ponto é hoje, já está no histórico
  ]

  return (
    <div className={styles.tabelaWrap}>
      <table className={styles.tabela}>
        <caption className={styles.srOnly}>Saldo dia a dia em novembro</caption>
        <thead>
          <tr><th scope="col">Dia</th><th scope="col">Saldo</th><th scope="col">Tipo</th></tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i}>
              <td>{diaEMes(linha.data)}</td>
              <td><Valor centavos={linha.saldo} /></td>
              <td>{linha.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
