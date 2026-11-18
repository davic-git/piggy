import { useState, useEffect, useMemo, useCallback } from 'react'
import { ValoresOcultosContext } from './valores-ocultos-context'

const CHAVE = 'piggy-ocultar-valores'

function lerSalvo() {
  try {
    return localStorage.getItem(CHAVE) === 'sim'
  } catch {
    return false
  }
}

// Spec 3.1: ocultar valores "vale para a tela inteira e fica salvo".
// Tela inteira -> Context (todo <Valor> lê daqui). Fica salvo -> localStorage.
export function ValoresOcultosProvider({ children }) {
  const [ocultos, setOcultos] = useState(lerSalvo)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, ocultos ? 'sim' : 'nao')
    } catch {
      // sem persistência, mas continua funcionando nesta visita
    }
  }, [ocultos])

  const alternar = useCallback(() => setOcultos((o) => !o), [])
  const valor = useMemo(() => ({ ocultos, alternar }), [ocultos, alternar])

  return (
    <ValoresOcultosContext.Provider value={valor}>{children}</ValoresOcultosContext.Provider>
  )
}
