import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"
import { Navbar } from "../components/Navbar";
import { SideNavbar } from "../components/SideNavbar";
import { CreateUser } from "../pages/CreateUser";

export const Router = () => {

  return (
    <BrowserRouter>
      <header className="w-screen h-20">
        <Navbar />
      </header>
      <SideNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-user" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  )
}