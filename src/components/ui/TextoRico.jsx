import { Fragment } from 'react'
import Valor from './Valor'

// Monta um texto a partir de "partes" (ver data/dashboard.js).
// Existe para que frases com dinheiro dentro também respeitem "ocultar valores".
export default function TextoRico({ partes }) {
  return partes.map((parte, i) => {
    // A lista é fixa (não reordena nem remove itens), então o índice serve de key.
    if (typeof parte === 'string') return <Fragment key={i}>{parte}</Fragment>
    if ('centavos' in parte) return <Valor key={i} centavos={parte.centavos} />
    return <strong key={i}>{parte.destaque}</strong>
  })
}
