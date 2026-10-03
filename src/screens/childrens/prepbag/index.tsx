import '../../../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faBoxOpen,
  faChevronDown,
  faLocationDot,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Pedido = {
  id: string
  resumo: string
  cliente: string
  endereco: string
  itens: string[]
  total: string
  observacao?: string
}

type StatusPedido = 'recebido' | 'preparacao' | 'recusado'

const STATUS_VISUAL: Record<
  StatusPedido,
  { label: string; borda: string; badge: string }
> = {
  recebido: {
    label: 'Aguardando',
    borda: 'border-slate-200',
    badge: 'bg-slate-50 text-slate-400 font-medium',
  },
  preparacao: {
    label: 'Em preparação',
    borda: 'border-slate-300',
    badge: 'bg-slate-100 text-slate-600 font-semibold',
  },
  recusado: {
    label: 'Recusado',
    borda: 'border-red-200',
    badge: 'bg-red-50 text-red-600 font-semibold',
  },
}

const PEDIDOS: Pedido[] = [
  {
    id: 'Pedido #1',
    resumo: '2 itens • Pizzaria Bella',
    cliente: 'Ana Souza',
    endereco: 'Rua das Flores, 120 - Icaraí',
    itens: ['Pizza Margherita', 'Refrigerante 2L'],
    total: 'R$ 68,90',
  },
  {
    id: 'Pedido #2',
    resumo: '1 item • Sushi House',
    cliente: 'Carlos Lima',
    endereco: 'Av. Roberto Silveira, 45 - Icaraí',
    itens: ['Combo 30 peças'],
    total: 'R$ 89,00',
    observacao: 'Sem cebolinha.',
  },
  {
    id: 'Pedido #3',
    resumo: '3 itens • Burger Point',
    cliente: 'Marina Alves',
    endereco: 'Rua Moreira César, 300 - Pé Pequeno',
    itens: ['Cheeseburger', 'Batata frita', 'Milkshake'],
    total: 'R$ 54,50',
  },
  {
    id: 'Pedido #4',
    resumo: '2 itens • Farmácia Central',
    cliente: 'João Pereira',
    endereco: 'Rua Lopes Trovão, 88 - Icaraí',
    itens: ['Dipirona 1g', 'Vitamina C'],
    total: 'R$ 32,40',
  },
  {
    id: 'Pedido #5',
    resumo: '1 item • Padaria Pão Quente',
    cliente: 'Luciana Rocha',
    endereco: 'Rua Miguel de Frias, 15 - Icaraí',
    itens: ['Bolo de cenoura'],
    total: 'R$ 28,00',
    observacao: 'Entregar até as 16h.',
  },
  {
    id: 'Pedido #6',
    resumo: '4 itens • Mercado Bom Preço',
    cliente: 'Rafael Costa',
    endereco: 'Av. Sete de Setembro, 410 - Fonseca',
    itens: ['Arroz 5kg', 'Feijão 1kg', 'Óleo', 'Café 500g'],
    total: 'R$ 76,20',
  },
  {
    id: 'Pedido #7',
    resumo: '2 itens • Doceria Doce Mel',
    cliente: 'Patrícia Gomes',
    endereco: 'Rua Presidente Backer, 70 - Icaraí',
    itens: ['Caixa de brigadeiros', 'Torta de limão'],
    total: 'R$ 96,00',
    observacao: 'Presente, embalar com cuidado.',
  },
  {
    id: 'Pedido #8',
    resumo: '1 item • Pet Shop Amigo',
    cliente: 'Bruno Martins',
    endereco: 'Rua Gavião Peixoto, 200 - Icaraí',
    itens: ['Ração premium 10kg'],
    total: 'R$ 189,90',
  },
  {
    id: 'Pedido #9',
    resumo: '2 itens • Açaí Tropical',
    cliente: 'Fernanda Dias',
    endereco: 'Rua Ary Parreiras, 33 - Icaraí',
    itens: ['Açaí 500ml', 'Granola extra'],
    total: 'R$ 27,00',
  },
  {
    id: 'Pedido #10',
    resumo: '3 itens • Livraria Página',
    cliente: 'Eduardo Nunes',
    endereco: 'Rua Coronel Moreira César, 160 - Icaraí',
    itens: ['Livro A', 'Livro B', 'Marcador de página'],
    total: 'R$ 142,30',
  },
  {
    id: 'Pedido #11',
    resumo: '2 itens • Cantina da Nonna',
    cliente: 'Isabela Freitas',
    endereco: 'Rua Dr. Mário Viana, 512 - Santa Rosa',
    itens: ['Lasanha à bolonhesa', 'Suco de laranja'],
    total: 'R$ 61,00',
  },
]

function PedidoCard({
  pedido,
  status,
  onRecusar,
  onPreparar,
}: {
  pedido: Pedido
  status: StatusPedido
  onRecusar: () => void
  onPreparar: () => void
}) {
  const [aberto, setAberto] = useState(false)

  const visual = STATUS_VISUAL[status]

  // Regras:
  // - recebido: pode recusar ou preparar
  // - recusado: pode se arrepender e preparar (não faz sentido recusar de novo)
  // - preparacao: decisão final, nenhuma ação disponível
  const podeRecusar = status === 'recebido'
  const podePreparar = status !== 'preparacao'

  return (
    <div
      className={`rounded-xl border bg-white text-slate-800 shadow-sm ${visual.borda}`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="block font-medium">{pedido.id}</span>

            <span className="block truncate text-xs text-slate-500">
              {pedido.resumo}
            </span>
          </span>

          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-xs text-slate-400 transition-transform duration-200 ${
              aberto ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          aberto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 border-t border-slate-100 px-4 py-4 text-sm">
            <div className="flex items-start gap-2 text-slate-600">
              <FontAwesomeIcon
                icon={faUser}
                className="mt-0.5 w-4 text-slate-400"
              />
              <span>{pedido.cliente}</span>
            </div>

            <div className="flex items-start gap-2 text-slate-600">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mt-0.5 w-4 text-slate-400"
              />
              <span>{pedido.endereco}</span>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Itens
              </p>

              <ul className="list-inside list-disc text-slate-600">
                {pedido.itens.map((item, i) => (
                  <li key={`${item}-${i}`}>{item}</li>
                ))}
              </ul>
            </div>

            {pedido.observacao && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                {pedido.observacao}
              </p>
            )}

            <p className="text-right font-semibold text-slate-900">
              {pedido.total}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center">
        {/* Só mostra as ações que ainda fazem sentido para o status atual */}
        <div className="flex flex-1 gap-3">
          {podeRecusar && (
            <button
              type="button"
              onClick={onRecusar}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <FontAwesomeIcon icon={faXmark} className="mr-2" />
              Recusar pedido
            </button>
          )}

          {podePreparar && (
            <button
              type="button"
              onClick={onPreparar}
              className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {status === 'recusado' ? 'Reconsiderar e preparar' : 'Preparar'}
            </button>
          )}
        </div>

        <div className="flex min-w-36 items-center justify-center">
          <span className={`rounded-full px-4 py-2 text-xs ${visual.badge}`}>
            {visual.label}
          </span>
        </div>
      </div>
    </div>
  )
}

function PrepBagScreen() {
  const navigate = useNavigate()

  const [pedidos] = useState<Pedido[]>(PEDIDOS)

  const [status, setStatus] = useState<Record<string, StatusPedido>>({})

  function recusarPedido(id: string) {
    setStatus((current) => {
      // Depois de aceito, não dá mais para recusar
      if (current[id] === 'preparacao') return current

      return { ...current, [id]: 'recusado' }
    })
  }

  function prepararPedido(id: string) {
    setStatus((current) => ({
      ...current,
      [id]: 'preparacao',
    }))
  }

  const pedidosAguardando = pedidos.filter(
    (pedido) => (status[pedido.id] ?? 'recebido') === 'recebido',
  ).length

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="flex w-full items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Voltar para o início"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            </button>

            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Produtos recebidos
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Encaminhamento de produtos
              </p>
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </header>

      <section className="flex-1 px-6 py-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Pedidos</h2>

              <p className="mt-1 text-sm text-slate-500">
                {pedidosAguardando} pedido(s) aguardando processamento
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {pedidos.map((pedido) => (
              <PedidoCard
                key={pedido.id}
                pedido={pedido}
                status={status[pedido.id] ?? 'recebido'}
                onRecusar={() => recusarPedido(pedido.id)}
                onPreparar={() => prepararPedido(pedido.id)}
              />
            ))}
          </div>

          {pedidos.length === 0 && (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-100/60 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm">
                <FontAwesomeIcon icon={faBoxOpen} className="text-xl" />
              </div>

              <p className="mt-4 text-sm font-medium text-slate-500">
                Não há pedidos para preparar
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Novos pedidos aparecerão aqui.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="w-full border-t border-slate-200 bg-white">
        <div className="px-6 py-4 text-center text-xs text-slate-400">
          Organize seus pedidos de forma simples e rápida.
        </div>
      </footer>
    </main>
  )
}

export default PrepBagScreen
