import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"
import { Navbar } from "../components/Navbar";

export const Router = () => {

  return (
    <BrowserRouter>
      <header className="w-screen h-20">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}