import { createContext } from 'react'

import type { AuthUser } from '../services/auth'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type AuthContextValue = {
  status: AuthStatus
  isAuthenticated: boolean
  user: AuthUser | null
  // Redireciona para a tela de login do Keycloak; volta para redirectPath.
  login: (redirectPath?: string) => Promise<void>
  logout: () => Promise<void>
  // Retorna um access token válido, renovando-o se necessário.
  getAccessToken: () => Promise<string | null>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
