// =============================================================================
// Dados de exemplo do Dashboard (spec 01-dashboard, seção 9).
// Quando existir API, este arquivo some e os componentes recebem os mesmos
// formatos vindos do servidor. Por isso os dados ficam SEPARADOS da tela.
//
// Todo dinheiro está em CENTAVOS (número inteiro): R$ 44,90 = 4490.
// Motivo: em JavaScript, 0.1 + 0.2 = 0.30000000000000004. Somando centavos
// inteiros a conta é sempre exata. Só dividimos por 100 na hora de mostrar.
// =============================================================================

// new Date(ano, mês, dia) — o mês começa em ZERO: 10 = novembro.
const dia = (n) => new Date(2026, 10, n)

// "Hoje" fixo enquanto os dados são de exemplo, para os números fecharem.
export const HOJE = dia(11)
export const INICIO_DO_MES = dia(1)
export const FIM_DO_MES = dia(30)

export const saldoEmConta = 707000

// Saldo no fim de cada dia, de 1 a 11 nov. O último é o saldo de hoje.
export const historicoSaldo = [
  { data: dia(1), saldo: 210000 },
  { data: dia(2), saldo: 210000 },
  { data: dia(3), saldo: 158000 },
  { data: dia(4), saldo: 158000 },
  { data: dia(5), saldo: 94000 },
  { data: dia(6), saldo: 61000 },
  { data: dia(7), saldo: 43695 },
  { data: dia(8), saldo: 723695 }, // salário
  { data: dia(9), saldo: 721505 },
  { data: dia(10), saldo: 697890 },
  { data: dia(11), saldo: 707000 },
]

export const vencimentos = [
  { id: 'netflix', data: dia(10), nome: 'Netflix', origem: 'Recorrente', centavos: 4490 },
  { id: 'fatura-nubank', data: dia(12), nome: 'Fatura Nubank', origem: 'Fatura', centavos: 241840 },
  { id: 'internet', data: dia(15), nome: 'Internet', origem: 'Recorrente', centavos: 10990 },
  { id: 'condominio', data: dia(18), nome: 'Condomínio', origem: 'Recorrente', centavos: 68000 },
  { id: 'energia', data: dia(20), nome: 'Energia elétrica', origem: 'Recorrente', centavos: 25332 },
  { id: 'fatura-inter', data: dia(25), nome: 'Fatura Inter', origem: 'Fatura', centavos: 84230 },
]

export const receitasPrevistas = [
  { id: 'freela', data: dia(28), nome: 'Freela', centavos: 120000 },
]

// Textos com valores dentro viram uma lista de "partes":
//   'texto'                -> texto comum
//   { centavos: 4490 }     -> dinheiro (respeita "ocultar valores")
//   { destaque: '73%' }    -> negrito
export const alertas = [
  {
    id: 'netflix-vencida',
    nivel: 'grave',
    titulo: 'Netflix venceu ontem',
    detalhe: [{ centavos: 4490 }, ' · recorrente'],
    acao: 'Marcar como pago',
    vencimentoId: 'netflix', // liga o alerta ao vencimento: pagar um resolve o outro
  },
  {
    id: 'delivery-limite',
    nivel: 'aviso',
    titulo: 'Delivery passou do limite',
    detalhe: [{ centavos: 64000 }, ' de ', { centavos: 50000 }, ' em novembro'],
    acao: 'Ajustar limite',
    destino: '/categories',
  },
  {
    id: 'nubank-media',
    nivel: 'aviso',
    titulo: 'Fatura Nubank acima da média',
    detalhe: ['18% acima dos últimos 3 meses'],
    acao: 'Ver fatura',
    destino: '/invoices',
  },
]

export const sugestaoPatrono = {
  texto: [
    'Pagar a fatura do Nubank em ',
    { destaque: '12 nov.' },
    ' faz o uso do cartão cair para ',
    { destaque: '73%' },
    '.',
  ],
}
