// Um formatador só, criado uma vez. Criar Intl.NumberFormat é caro,
// então não fazemos isso a cada valor mostrado.
const real = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

// formatarMoeda(707000)              -> "R$ 7.070,00"
// formatarMoeda(-314882)             -> "−R$ 3.148,82"
// formatarMoeda(15000, { sinal: true }) -> "+R$ 150,00"
export function formatarMoeda(centavos, { sinal = false } = {}) {
  const texto = real.format(Math.abs(centavos) / 100)

  // "−" (U+2212) é o sinal de menos tipográfico; o "-" do teclado é um hífen.
  if (centavos < 0) return `−${texto}`
  if (sinal && centavos > 0) return `+${texto}`
  return texto
}
