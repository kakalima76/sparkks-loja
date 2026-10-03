const url = import.meta.env.VITE_KEYCLOAK_URL ?? 'https://auth.sparkks.com.br'
const realm = import.meta.env.VITE_KEYCLOAK_REALM ?? 'app'

export const keycloakConfig = {
  url,
  realm,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID ?? 'sparkks-web',
  realmUrl: `${url}/realms/${realm}`,
}
