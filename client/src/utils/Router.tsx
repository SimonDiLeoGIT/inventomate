import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"
import { useAuth0 } from "@auth0/auth0-react";
// import { Navbar } from "../Navbar/Navbar"

export const Router = () => {

  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <BrowserRouter>
      {/* <header className="h-20">
        <Navbar />
      </header> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}