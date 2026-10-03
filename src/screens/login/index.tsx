import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { Location } from 'react-router-dom'

import '../../index.css'
import logo from '../../assets/logo.png'
import { useAuth } from '../../contexts/useAuth'

// A tela de login é a do Keycloak (tema sparkks-loja); aqui apenas redirecionamos.
export default function LoginScreen() {
  const { login } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: Location } | null)?.from
  const redirectPath = from ? `${from.pathname}${from.search}` : '/home'

  useEffect(() => {
    void login(redirectPath)
  }, [login, redirectPath])

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6">
        <img src={logo} alt="Logo" className="h-20 w-auto object-contain" />
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        <p className="text-sm text-slate-500">Redirecionando para o login...</p>
      </div>
    </main>
  )
}
