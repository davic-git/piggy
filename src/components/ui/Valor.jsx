import { useValoresOcultos } from '../../hooks/useValoresOcultos'
import { formatarMoeda } from '../../lib/dinheiro'

// TODO valor em dinheiro da tela passa por aqui. Assim "ocultar valores"
// funciona em um lugar só, e nenhum card precisa saber que essa opção existe.
export default function Valor({ centavos, sinal = false, className }) {
  const { ocultos } = useValoresOcultos()

  if (ocultos) {
    return <span className={className}>R$ ••••</span>
  }
  return <span className={className}>{formatarMoeda(centavos, { sinal })}</span>
}
