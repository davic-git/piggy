import { useContext } from 'react'
import { ThemeContext } from '../lib/theme-context'

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (ctx === null) {
    throw new Error('useTheme() precisa estar dentro de <ThemeProvider>')
  }
  return ctx
}
