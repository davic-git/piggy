import { useContext } from 'react'
import { ValoresOcultosContext } from '../lib/valores-ocultos-context'

export function useValoresOcultos() {
  const ctx = useContext(ValoresOcultosContext)
  if (ctx === null) {
    throw new Error('useValoresOcultos() precisa estar dentro de <ValoresOcultosProvider>')
  }
  return ctx
}
