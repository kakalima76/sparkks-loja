import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBagShopping,
  faBars,
  faBoxOpen,
  faClipboardList,
  faGear,
  faRightFromBracket,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

import '../../index.css'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'

export default function HomeScreen() {
  const navigate = useNavigate()
  const creditosDisponiveis = 127

  const [menuAberto, setMenuAberto] = useState(false)

  const auth = useAuth()
  const user = {
    name: auth.user?.name ?? '',
    email: auth.user?.email ?? '',
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="relative w-full px-6 py-4 flex items-center justify-between">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />

          {/* Créditos */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xs font-medium text-slate-500">
              Créditos disponíveis
            </p>

            <p className="text-lg font-bold text-red-600">
              {creditosDisponiveis}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <FontAwesomeIcon icon={faUser} />
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-slate-800">
                  {user.name}
                </p>

                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMenuAberto(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Abrir menu"
              aria-expanded={menuAberto}
            >
              <FontAwesomeIcon icon={faBars} className="text-lg" />
            </button>
          </div>
        </div>
      </header>

      {/* Navegação principal */}
      <section className="flex-1 w-full flex items-center justify-center px-6">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Pedidos recebidos */}
          <button
            type="button"
            onClick={() => {
              navigate('/prepbag')
            }}
            className="group flex min-h-64 flex-col items-center justify-center rounded-2xl bg-white px-8 py-10 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition group-hover:bg-slate-100">
              <FontAwesomeIcon icon={faClipboardList} className="text-4xl" />
            </div>

            <h2 className="mt-6 text-lg font-semibold text-slate-900">
              Pedidos recebidos
            </h2>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              Visualizar novos pedidos
            </p>
          </button>

          {/* Pedidos em preparação */}
          <button
            type="button"
            onClick={() => {
              navigate('/inprep')
            }}
            className="group flex min-h-64 flex-col items-center justify-center rounded-2xl bg-white px-8 py-10 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition group-hover:bg-slate-100">
              <FontAwesomeIcon icon={faBoxOpen} className="text-4xl" />
            </div>

            <h2 className="mt-6 text-lg font-semibold text-slate-900">
              Em preparação
            </h2>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              Acompanhar pedidos em preparo
            </p>
          </button>

          {/* Sacola */}
          <button
            type="button"
            onClick={() => {
              navigate('/deliverybag')
            }}
            className="group flex min-h-64 flex-col items-center justify-center rounded-2xl bg-white px-8 py-10 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition group-hover:bg-slate-100">
              <FontAwesomeIcon icon={faBagShopping} className="text-4xl" />
            </div>

            <h2 className="mt-6 text-lg font-semibold text-slate-900">
              Sacola
            </h2>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              Gerenciar pedidos na sacola
            </p>
          </button>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="w-full border-t border-slate-200 bg-white">
        <div className="w-full px-6 py-5">
          <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Plataforma</p>

            <div className="flex gap-5">
              <button type="button" className="transition hover:text-slate-900">
                Termos de uso
              </button>

              <button type="button" className="transition hover:text-slate-900">
                Privacidade
              </button>

              <button type="button" className="transition hover:text-slate-900">
                Suporte
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Fundo do menu */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/20 transition-opacity duration-300 ${
          menuAberto
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuAberto(false)}
      />

      {/* Menu lateral */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          menuAberto ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!menuAberto}
      >
        {/* Cabeçalho do menu */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Menu</h2>

            <p className="mt-1 text-xs text-slate-500">{user.name}</p>
          </div>

          <button
            type="button"
            onClick={() => setMenuAberto(false)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Fechar menu"
          >
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>
        </div>

        {/* Opções */}
        <nav className="flex-1 px-4 py-6">
          <button
            type="button"
            onClick={() => {
              setMenuAberto(false)
              navigate('/settings')
            }}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <FontAwesomeIcon icon={faGear} />
            </div>

            <div>
              <p className="text-sm font-semibold">Configurações</p>

              <p className="mt-1 text-xs text-slate-400">
                Preferências da loja
              </p>
            </div>
          </button>
        </nav>

        {/* Rodapé do menu */}
        <div className="border-t border-slate-200 px-6 py-5">
          <button
            type="button"
            onClick={() => {
              setMenuAberto(false)
              void auth.logout()
            }}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Sair
          </button>

          <p className="text-center text-xs text-slate-400">{user.email}</p>
        </div>
      </aside>
    </main>
  )
}
