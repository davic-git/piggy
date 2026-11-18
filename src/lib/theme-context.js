import { createContext } from 'react'

// O "cano" por onde o tema viaja. Fica sozinho neste arquivo porque o
// plugin react-refresh do eslint reclama quando o mesmo arquivo exporta
// um componente e um não-componente.
export const ThemeContext = createContext(null)
