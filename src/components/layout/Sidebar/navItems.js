import {
  House, ChartNoAxesColumn, CreditCard, FileText, ChartPie,
  Repeat, PiggyBank, Target, Settings, CircleHelp,
} from 'lucide-react'

export const navGroups = [
  {
    title: 'Visão geral',
    items: [
      { label: 'Dashboard', to: '/', icon: House },
      { label: 'Análises', to: '/analises', icon: ChartNoAxesColumn },
    ],
  },
  {
    title: 'Finanças',
    items: [
      { label: 'Transações', to: '/transacoes', icon: CreditCard },
      { label: 'Faturas', to: '/faturas', icon: FileText },
      { label: 'Categorias', to: '/categorias', icon: ChartPie },
      { label: 'Recorrentes', to: '/recorrentes', icon: Repeat },
    ],
  },
  {
    title: 'Planejamento',
    items: [
      { label: 'Piggy', to: '/piggy', icon: PiggyBank },
      { label: 'Metas', to: '/metas', icon: Target },
    ],
  },
]

export const footerItems = [
  { label: 'Configurações', to: '/configuracoes', icon: Settings },
  { label: 'Ajuda', to: '/ajuda', icon: CircleHelp },
]