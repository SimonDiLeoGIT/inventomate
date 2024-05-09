import { useAuth0 } from "@auth0/auth0-react"
import { UserProvider } from "./context/user"
import { Router } from "./utils/Router"
import { Loading } from "./pages/Loading"
import { TrendsProvider } from "./context/trends"

function App() {

  const { isLoading } = useAuth0()

  if (isLoading) {
    return <Loading />
  }


  return (
    <UserProvider>
      <TrendsProvider>
        <Router />
      </TrendsProvider>
    </UserProvider>
  )
}

export default App
