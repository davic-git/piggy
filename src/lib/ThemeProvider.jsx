import { useState, useEffect, useMemo, useCallback } from 'react'
import { ThemeContext } from './theme-context'

const CHAVE = 'piggy-tema'
const PADRAO = 'dark'
const BARRA = { dark: '#121A23', light: '#EEEBE5' }

function lerSalvo() {
  try {
    const v = localStorage.getItem(CHAVE)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null // navegação privada pode bloquear o localStorage
  }
}

export function ThemeProvider({ children }) {
  // A função dentro do useState só roda na PRIMEIRA renderização.
  // useState(lerSalvo()) leria o localStorage a cada render e jogaria fora.
  const [theme, setTheme] = useState(() => lerSalvo() ?? PADRAO)

  useEffect(() => {
    const raiz = document.documentElement

    // Desliga as transições enquanto troca, senão cada cor anima no seu
    // tempo e a tela "derrete". O CSS da trava está no tokens.css.
    raiz.setAttribute('data-trocando-tema', '')

    raiz.dataset.theme = theme // vira o atributo data-theme no <html>

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = BARRA[theme]

    try {
      localStorage.setItem(CHAVE, theme)
    } catch {
      // sem persistência, mas o tema continua funcionando
    }

    // Dois frames: garante que o navegador já pintou com as cores novas.
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => raiz.removeAttribute('data-trocando-tema'))
    })

    // Função de limpeza: roda antes do próximo efeito e ao desmontar.
    return () => cancelAnimationFrame(id)
  }, [theme])

  const alternar = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  // Sem o useMemo, todo render do provider cria um objeto novo e re-renderiza
  // todo mundo que usa o tema, mesmo quando nada mudou.
  const valor = useMemo(() => ({ theme, setTheme, alternar }), [theme, alternar])

  return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>
}
