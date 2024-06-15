import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE
console.log(domain)
console.log(clientId)
console.log(audience)

ReactDOM.createRoot(document.getElementById('root')!).render(
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
