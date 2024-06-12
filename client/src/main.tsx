import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN || 'dev-xzd1nw16hc11vsj7.us.auth0.com'
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID || 'joqKy6suHcPTxhs2CfgWWlTwKsMMSGyQ'
const audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE || 'grupo3SIP2024'
const url = "https://api.inventomate.xyz/"

console.log(domain)
console.log(clientId)
console.log(audience)
console.log(url)


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
