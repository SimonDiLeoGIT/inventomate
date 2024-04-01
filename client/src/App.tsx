import { useAuth0 } from '@auth0/auth0-react';
import { Router } from "./utils/Router"
import { Login } from './pages/Login';


function App() {

  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <Router />
  )
}

export default App
