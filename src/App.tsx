import './index.css'
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { useState } from 'react'

const TODOS_OS_BOTOES = Array.from({ length: 11 }, (_, i) => `Pedido #${i + 1}`)

const MIN_ITENS = 1
const MAX_ITENS = 5

const CORES = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
}

function DraggableButton({
  id,
  color,
}: {
  id: string
  color: 'blue' | 'green'
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id })

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`w-full rounded px-4 py-3 text-white ${CORES[color]} ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      {id}
    </button>
  )
}

function Catalogo({ items }: { items: string[] }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'catalogo' })

  return (
    <div
      ref={setNodeRef}
      className={`flex max-h-[38rem] min-h-20 w-1/2 flex-col gap-3 overflow-y-auto rounded-xl border-2 border-dashed p-2 ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-transparent'
      }`}
    >
      {items.map((id) => (
        <DraggableButton key={id} id={id} color="blue" />
      ))}
    </div>
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
  const { isOver, setNodeRef } = useDroppable({ id: 'bolsa' })

  return (
    <div className="flex h-1/2 w-1/2 shrink-0 flex-col gap-2">
      <div className="text-center">
        <strong>
          Bolsa ({items.length}/{MAX_ITENS})
        </strong>
        {aviso && <p className="text-sm text-red-600">{aviso}</p>}
      </div>

      <div
        ref={setNodeRef}
        className={`flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto rounded-xl border-2 border-dashed p-2 ${
          isOver ? 'border-gray-600 bg-gray-300' : 'border-gray-400 bg-gray-200'
        }`}
      >
        {items.map((id) => (
          <div key={id} className="flex w-full items-center gap-2">
            <div className="flex-1">
              <DraggableButton id={id} color="green" />
            </div>
            <button
              type="button"
              onClick={() => onRemove(id)}
              aria-label={`Remover ${id}`}
              className="rounded px-2 text-gray-500 hover:bg-red-100 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [items, setItems] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)

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
      if (items.includes(id)) return

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
    if (!podeSolicitar) return
    alert(`Entregador solicitado para: ${items.join(', ')}`)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <main className="flex h-screen flex-col items-center gap-4 overflow-y-auto p-4">
        <Catalogo items={disponiveis} />
        <Bolsa items={items} aviso={aviso} onRemove={removerItem} />

        <button
          type="button"
          onClick={solicitarEntregador}
          disabled={!podeSolicitar}
          className="w-1/2 shrink-0 rounded bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
          SOLICITAR ENTREGADOR
        </button>
        {!podeSolicitar && (
          <p className="shrink-0 text-sm text-gray-500">
            Adicione pelo menos {MIN_ITENS} item na bolsa.
          </p>
        )}
      </main>

      <DragOverlay>
        {activeId ? (
          <div
            className={`w-full rounded px-4 py-3 text-center text-white shadow-lg ${
              items.includes(activeId) ? CORES.green : CORES.blue
            }`}
          >
            {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default App