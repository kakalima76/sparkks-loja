import '../../../index.css'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
  faBoxOpen,
  faChevronDown,
  faGripVertical,
  faLocationDot,
  faTruck,
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

const PEDIDOS_POR_ID: Record<string, Pedido> = Object.fromEntries(
  PEDIDOS.map((p) => [p.id, p]),
)
const TODOS_OS_BOTOES = PEDIDOS.map((p) => p.id)

const MIN_ITENS = 1
const MAX_ITENS = 5

function DraggableButton({ id }: { id: string }) {
  const pedido = PEDIDOS_POR_ID[id]
  const [aberto, setAberto] = useState(false)
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border border-slate-200 bg-white text-slate-800 transition duration-200 hover:border-slate-300 hover:shadow-sm ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      <div className="flex items-center gap-2 px-3 py-3">
        {/* Alça de arrastar */}
        <button
          type="button"
          {...listeners}
          {...attributes}
          aria-label={`Arrastar ${id}`}
          className="flex h-10 w-10 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition hover:bg-slate-100 active:cursor-grabbing"
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </button>

        {/* Cabeçalho do acordeão */}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="block font-medium">{id}</span>
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

      {/* Conteúdo do acordeão */}
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
                {pedido.itens.map((item) => (
                  <li key={item}>{item}</li>
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
    </div>
  )
}

function Catalogo({ items }: { items: string[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'catalogo',
  })

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
          <FontAwesomeIcon icon={faBoxOpen} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">Pedidos recebidos</h2>

          <p className="text-sm text-slate-500">
            Arraste os pedidos para a sacola
          </p>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`min-h-40 flex-1 overflow-y-auto rounded-2xl border-2 border-dashed p-4 transition ${
          isOver
            ? 'border-slate-400 bg-white'
            : 'border-slate-200 bg-slate-100/60'
        }`}
      >
        <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((id) => (
            <DraggableButton key={id} id={id} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="flex h-full min-h-32 items-center justify-center">
            <p className="text-center text-sm text-slate-400">
              Todos os pedidos estão na sacola.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function Bolsa({
  items,
  aviso,
  onRemove,
}: {
  items: string[]
  aviso: string | null
  onRemove: (id: string) => void
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'bolsa',
  })

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">Sacola</h2>

            <p className="text-sm text-slate-500">
              Pedidos para entrega do mesmo entregador
            </p>
          </div>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {items.length}/{MAX_ITENS}
        </span>
      </div>

      {aviso && (
        <div className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {aviso}
        </div>
      )}

      <div
        ref={setNodeRef}
        className={`min-h-40 flex-1 overflow-y-auto rounded-2xl border-2 border-dashed p-4 transition ${
          isOver
            ? 'border-slate-400 bg-white'
            : 'border-slate-200 bg-slate-100/60'
        }`}
      >
        {items.length === 0 ? (
          <div className="flex h-full min-h-32 flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm">
              <FontAwesomeIcon icon={faBoxOpen} className="text-xl" />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Sua sacola está vazia
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Arraste os pedidos para cá
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((id) => (
              <div key={id} className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <DraggableButton id={id} />
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(id)}
                  aria-label={`Remover ${id}`}
                  className="mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function DeliveryBagScreen() {
  const [items, setItems] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const navigate = useNavigate()

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
  )

  const disponiveis = TODOS_OS_BOTOES.filter((id) => !items.includes(id))

  const podeSolicitar = items.length >= MIN_ITENS

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)

    const id = String(event.active.id)
    const destino = event.over?.id

    if (destino === 'bolsa') {
      if (items.includes(id)) {
        return
      }

      if (items.length >= MAX_ITENS) {
        setAviso(`A bolsa aceita no máximo ${MAX_ITENS} itens.`)
        return
      }

      setAviso(null)

      setItems((current) => [...current, id])
    }

    if (destino === 'catalogo') {
      setAviso(null)

      setItems((current) => current.filter((item) => item !== id))
    }
  }

  function removerItem(id: string) {
    setAviso(null)

    setItems((current) => current.filter((item) => item !== id))
  }

  function solicitarEntregador() {
    if (!podeSolicitar) {
      return
    }

    alert(`Entregador solicitado para: ${items.join(', ')}`)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <main className="min-h-screen bg-slate-50 flex flex-col">
        {/* Cabeçalho */}
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
                  Distribuição de pedidos
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Organize os pedidos e solicite um entregador.
                </p>
              </div>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <section className="flex-1 px-6 py-8">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
            <div className="grid min-h-0 flex-1 gap-8 lg:grid-cols-2">
              <Catalogo items={disponiveis} />

              <Bolsa items={items} aviso={aviso} onRemove={removerItem} />
            </div>

            {/* Ação */}
            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                onClick={solicitarEntregador}
                disabled={!podeSolicitar}
                className="flex min-w-72 items-center justify-center gap-3 rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                <FontAwesomeIcon icon={faTruck} />
                SOLICITAR ENTREGADOR
              </button>

              {!podeSolicitar && (
                <p className="mt-3 text-sm text-slate-400">
                  Adicione pelo menos {MIN_ITENS} pedido à sacola.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Rodapé */}
        <footer className="w-full border-t border-slate-200 bg-white">
          <div className="px-6 py-4 text-center text-xs text-slate-400">
            Organize seus pedidos de forma simples e rápida.
          </div>
        </footer>
      </main>

      <DragOverlay>
        {activeId ? (
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-800 shadow-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
              <FontAwesomeIcon icon={faGripVertical} />
            </div>

            <div>
              <span className="block font-medium">{activeId}</span>
              <span className="block text-xs text-slate-500">
                {PEDIDOS_POR_ID[activeId]?.resumo}
              </span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default DeliveryBagScreen
