// "quarta, 11 nov." — formato do header (spec 01-dashboard, 2.2)
export function formatarHoje(data = new Date()) {
  const diaDaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
    .format(data)
    .replace('-feira', '') // "quarta-feira" -> "quarta"

  const mes = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(data) // "nov."

  return `${diaDaSemana}, ${data.getDate()} ${mes}`
}

const UM_DIA = 24 * 60 * 60 * 1000 // em milissegundos

// Quantos dias faltam (positivo) ou passaram (negativo) até a data.
export function diasAte(data, hoje) {
  return Math.round((data - hoje) / UM_DIA)
}

export function amanha(hoje) {
  return new Date(hoje.getTime() + UM_DIA)
}

// "venceu ontem", "venceu há 3 dias", "hoje", "amanhã", "em 4 dias"
export function prazoRelativo(data, hoje) {
  const dias = diasAte(data, hoje)
  if (dias === -1) return 'venceu ontem'
  if (dias < -1) return `venceu há ${-dias} dias`
  if (dias === 0) return 'hoje'
  if (dias === 1) return 'amanhã'
  return `em ${dias} dias`
}

// "nov."
export function mesCurto(data) {
  return new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(data)
}

// "30 nov."
export function diaEMes(data) {
  return `${data.getDate()} ${mesCurto(data)}`
}
