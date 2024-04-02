import { Auth0Provider } from '@auth0/auth0-react'
import App from '../App'

export const AutenticationProvider = () => {

  const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID
  const audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  )
}

