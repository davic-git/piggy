import { amanha } from '../../lib/datas'

// Soma o campo "centavos" de uma lista.
export function somar(itens) {
  return itens.reduce((total, item) => total + item.centavos, 0)
}

// "Como calculamos" (spec 3.1):
//   saldo − vencimentos até o fim do mês + receitas previstas = previsto
// O previsto NUNCA é guardado: é calculado sempre a partir dos dados.
// Se um vencimento é pago, o resultado se ajusta sozinho.
export function calcularPrevisao({ saldo, vencimentos, receitas }) {
  const totalVencimentos = somar(vencimentos)
  const totalReceitas = somar(receitas)
  return {
    totalVencimentos,
    totalReceitas,
    previsto: saldo - totalVencimentos + totalReceitas,
  }
}

// Pontos do saldo de hoje até o fim do mês, um degrau por lançamento.
// Vencidos e não pagos entram amanhã (não dá para pagar no passado).
export function projetarSaldo({ saldo, hoje, fim, vencimentos, receitas }) {
  const dataMinima = amanha(hoje)

  const eventos = [
    ...vencimentos.map((v) => ({
      data: v.data < dataMinima ? dataMinima : v.data,
      centavos: -v.centavos,
    })),
    ...receitas.map((r) => ({ data: r.data, centavos: r.centavos })),
  ].sort((a, b) => a.data - b.data)

  const pontos = [{ data: hoje, saldo }]
  let atual = saldo
  for (const evento of eventos) {
    atual += evento.centavos
    pontos.push({ data: evento.data, saldo: atual })
  }
  pontos.push({ data: fim, saldo: atual })
  return pontos
}
