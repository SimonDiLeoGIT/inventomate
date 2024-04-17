import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"
import { Navbar } from "../components/Navbar";
import { SideNavbar } from "../components/SideNavbar";

export const Router = () => {

  return (
    <BrowserRouter>
      <header className="w-full h-20 overflow-x-hidden">
        <Navbar />
      </header>
      <SideNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}