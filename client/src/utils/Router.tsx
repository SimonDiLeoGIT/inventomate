import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"
import { Navbar } from "../components/Navbar";
import { SideNavbar } from "../components/SideNavbar";
import { Company } from "../pages/Company";

export const Router = () => {

  return (
    <BrowserRouter>
      <header className="w-full  h-20 shadow-md fixed top-0 overflow-hidden">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/company" element={<Company />} />
      </Routes>
    </BrowserRouter>
  )
}