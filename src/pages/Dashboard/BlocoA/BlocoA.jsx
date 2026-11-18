import { useState, useEffect } from 'react'
import SaldoPrevisto from './SaldoPrevisto'
import ProximosVencimentos from './ProximosVencimentos'
import PedeAtencao from './PedeAtencao'
import Toast from '../../../components/ui/Toast'
import {
  HOJE,
  INICIO_DO_MES,
  FIM_DO_MES,
  saldoEmConta,
  historicoSaldo,
  vencimentos,
  receitasPrevistas,
  alertas,
  sugestaoPatrono,
} from '../../../data/dashboard'
import { somar } from '../calculos'
import styles from './BlocoA.module.css'

// O estado mora AQUI porque as três colunas dependem dele:
// pagar um vencimento muda o saldo (coluna 1), tira o item da lista (coluna 2)
// e resolve o alerta ligado a ele (coluna 3). Estado fica no ancestral
// comum mais próximo de quem precisa dele.
export default function BlocoA() {
  // Guardamos só o MÍNIMO: quais ids foram pagos/dispensados.
  const [pagos, setPagos] = useState([])
  const [alertasDispensados, setAlertasDispensados] = useState([])
  const [patronoDispensado, setPatronoDispensado] = useState(false)
  const [ultimoPago, setUltimoPago] = useState(null) // para o "Desfazer"

  // Todo o resto é DERIVADO, calculado a cada render. Nada de guardar
  // "saldo" num useState: teria que lembrar de atualizar em dois lugares.
  const pendentes = vencimentos.filter((v) => !pagos.includes(v.id))
  const saldo = saldoEmConta - somar(vencimentos.filter((v) => pagos.includes(v.id)))
  const historico = historicoSaldo.map((ponto, i) =>
    i === historicoSaldo.length - 1 ? { ...ponto, saldo } : ponto,
  )

  function marcarComoPago(id) {
    setPagos((atual) => [...atual, id]) // array novo: o React só re-renderiza se a referência mudar
    setUltimoPago(id)
  }

  function desfazer() {
    setPagos((atual) => atual.filter((id) => id !== ultimoPago))
    setUltimoPago(null)
  }

  // O toast some sozinho em 5 s (spec 3.2). A limpeza cancela o timer se
  // o usuário pagar outro item antes disso, ou clicar em Desfazer.
  useEffect(() => {
    if (ultimoPago === null) return
    const timer = setTimeout(() => setUltimoPago(null), 5000)
    return () => clearTimeout(timer)
  }, [ultimoPago])

  const nomeDoUltimo = vencimentos.find((v) => v.id === ultimoPago)?.nome

  return (
    <section className={styles.bloco} aria-label="Como estou e o que vem pela frente">
      <SaldoPrevisto
        saldo={saldo}
        historico={historico}
        vencimentos={pendentes}
        receitas={receitasPrevistas}
        hoje={HOJE}
        inicio={INICIO_DO_MES}
        fim={FIM_DO_MES}
      />

      <ProximosVencimentos vencimentos={pendentes} hoje={HOJE} onMarcarPago={marcarComoPago} />

      <PedeAtencao
        alertas={alertas}
        pagos={pagos}
        dispensados={alertasDispensados}
        onDispensar={(id) => setAlertasDispensados((atual) => [...atual, id])}
        onMarcarPago={marcarComoPago}
        sugestao={patronoDispensado ? null : sugestaoPatrono}
        onDispensarSugestao={() => setPatronoDispensado(true)}
      />

      {nomeDoUltimo && (
        <Toast mensagem={`${nomeDoUltimo} marcado como pago.`} acao="Desfazer" onAcao={desfazer} />
      )}
    </section>
  )
}
