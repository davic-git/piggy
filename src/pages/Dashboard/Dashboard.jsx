import { ChevronDown, Plus } from 'lucide-react'
import Header from '../../components/layout/Header/Header'
import Button from '../../components/ui/Button'
import { formatarHoje } from '../../lib/datas'
import { HOJE } from '../../data/dashboard'
import BlocoA from './BlocoA/BlocoA'

export default function Dashboard() {
  return (
    <>
      <Header
        title="Dashboard"
        // Usa o mesmo "hoje" dos dados de exemplo, para a data bater com os números.
        // Quando os dados forem reais, volta a ser formatarHoje() sem argumento.
        subtitle={formatarHoje(HOJE)}
        actions={
          <>
            <Button iconRight={ChevronDown}>Este mês</Button>
            <Button variant="primary" icon={Plus}>Nova transação</Button>
          </>
        }
      />

      <BlocoA />

      {/* Bloco B entra na próxima aula */}
    </>
  )
}
