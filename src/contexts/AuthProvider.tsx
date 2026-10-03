import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import * as auth from '../services/auth'
import { AuthContext } from './auth-context'
import type { AuthContextValue, AuthStatus } from './auth-context'

// Renova o access token se faltar menos que isso (em segundos) para expirar.
const MIN_VALIDITY_SECONDS = 30

const { keycloak } = auth

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  // Incrementado a cada novo token, para recalcular os dados do usuário.
  const [tokenVersion, setTokenVersion] = useState(0)

  useEffect(() => {
    keycloak.onAuthSuccess = () => setTokenVersion((v) => v + 1)
    keycloak.onAuthRefreshSuccess = () => setTokenVersion((v) => v + 1)
    keycloak.onAuthLogout = () => setStatus('unauthenticated')
    keycloak.onAuthRefreshError = () => {
      keycloak.clearToken()
      setStatus('unauthenticated')
    }
    // Renova automaticamente quando o access token expira.
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(MIN_VALIDITY_SECONDS).catch(() => undefined)
    }

    auth
      .initAuth()
      .then((authenticated) => {
        setStatus(authenticated ? 'authenticated' : 'unauthenticated')
      })
      .catch(() => setStatus('unauthenticated'))
  }, [])

  const login = useCallback((redirectPath?: string) => auth.login(redirectPath), [])

  const logout = useCallback(() => auth.logout(), [])

  const getAccessToken = useCallback(async () => {
    if (!keycloak.authenticated) {
      return null
    }

    try {
      await keycloak.updateToken(MIN_VALIDITY_SECONDS)
      return keycloak.token ?? null
    } catch {
      return null
    }
  }, [])

  const user = useMemo(
    () => (status === 'authenticated' ? auth.userFromToken() : null),
    // tokenVersion força o recálculo quando o token é renovado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, tokenVersion],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      isAuthenticated: status === 'authenticated',
      user,
      login,
      logout,
      getAccessToken,
    }),
    [status, user, login, logout, getAccessToken],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
