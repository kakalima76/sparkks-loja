import Keycloak from 'keycloak-js'

import { keycloakConfig } from '../config/keycloak'

export type AuthUser = {
  id: string
  username: string
  name: string
  email: string
  roles: string[]
}

export const keycloak = new Keycloak({
  url: keycloakConfig.url,
  realm: keycloakConfig.realm,
  clientId: keycloakConfig.clientId,
})

let initPromise: Promise<boolean> | null = null

// keycloak-js só pode ser inicializado uma vez (o StrictMode monta os efeitos duas vezes).
export function initAuth(): Promise<boolean> {
  initPromise ??= keycloak.init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    checkLoginIframe: false,
  })

  return initPromise
}

export function login(redirectPath = '/home'): Promise<void> {
  return keycloak.login({
    redirectUri: `${window.location.origin}${redirectPath}`,
  })
}

export function logout(): Promise<void> {
  return keycloak.logout({
    redirectUri: `${window.location.origin}/`,
  })
}

export function userFromToken(): AuthUser | null {
  const claims = keycloak.tokenParsed
  if (!claims) {
    return null
  }

  const username = String(claims.preferred_username ?? '')

  return {
    id: String(claims.sub ?? ''),
    username,
    name: String(claims.name ?? claims.given_name ?? username),
    email: String(claims.email ?? ''),
    roles: claims.realm_access?.roles ?? [],
  }
}
