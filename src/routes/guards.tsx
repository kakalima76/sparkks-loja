import { Navigate, Outlet, useLocation } from 'react-router-dom'
import type { Location } from 'react-router-dom'

import { useAuth } from '../contexts/useAuth'

function LoadingScreen() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
    </main>
  )
}

// Rotas que exigem usuário autenticado.
export function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

// Rotas públicas (login) que não fazem sentido para quem já entrou.
export function PublicOnlyRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (status === 'authenticated') {
    // Após o login, volta para a rota protegida que o usuário tentou acessar.
    const from = (location.state as { from?: Location } | null)?.from
    return <Navigate to={from ?? '/home'} replace />
  }

  return <Outlet />
}
