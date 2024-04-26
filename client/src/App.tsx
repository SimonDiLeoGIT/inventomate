import { UserProvider } from "./context/user"
import { Router } from "./utils/Router"

function App() {

  return (
    <UserProvider>
      <Router />
    </UserProvider>
  )
}

export default App
