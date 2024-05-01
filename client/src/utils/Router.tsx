import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"
import { Navbar } from "../components/Navbar";
import { Company } from "../pages/Company";
import { RegisterCompany } from "../pages/RegisterCompany";
import { Loading } from "../pages/Loading";
import { RegisterBranch } from "../pages/RegisterBranch";

export const Router = () => {

  return (
    <BrowserRouter>
      <header className="w-full h-20 shadow-md overflow-hidden">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/company" element={<Company />} />
        <Route path="/company/register-branch" element={<RegisterBranch />} />
      </Routes>
    </BrowserRouter>
  )
}