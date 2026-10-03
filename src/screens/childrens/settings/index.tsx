import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faChevronLeft,
  faGear,
  faStore,
} from '@fortawesome/free-solid-svg-icons'

export default function SettingsScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 shadow-sm">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Voltar"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className="ml-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <FontAwesomeIcon icon={faGear} />
          </div>

          <div>
            <h1 className="text-base font-semibold text-slate-900">
              Configurações
            </h1>
            <p className="text-xs text-slate-400">
              Preferências da loja
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Preferências
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="flex items-center justify-between gap-4 px-5 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <FontAwesomeIcon icon={faBell} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Notificações
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Receber notificações de novos pedidos
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                Em breve
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <FontAwesomeIcon icon={faStore} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Dados da loja
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Informações e dados cadastrais
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                Em breve
              </span>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          Mais opções serão adicionadas posteriormente.
        </p>
      </main>
    </div>
  )
}