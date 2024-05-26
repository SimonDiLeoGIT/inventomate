import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Navbar } from "../components/Navbar";
import { Company } from "../pages/Company";
import { RegisterCompany } from "../pages/RegisterCompany";
import { RegisterBranch } from "../pages/RegisterBranch";
import { Branch } from "../pages/Branch";
import { TrendsReports } from "../pages/TrendsReports";
import { CompanySettings } from "../pages/CompanySettings";
import { Product } from "../pages/Product";
import { Profile } from "../pages/Profile";
import { Trend } from "../pages/Trend";
import { SalesForecastingReports } from "../pages/SalesForecastingReports";
import { SalesForecasting } from "../pages/SalesForecast"
import { TermsAndCondition } from "../pages/TermsAndConditions"
import { NextOrdersReports } from "../pages/NextOrdersReports";
import { NextOrders } from "../pages/NextOrders";
import { Obsolescense } from "../pages/Obsolescense";

export const Router = () => {

  return (
    <BrowserRouter>
      <section className="min-h-screen">
        <header className="w-full h-20 shadow-md overflow-hidden">
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms&conditions" element={<TermsAndCondition />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/company" element={<Company />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/company/company-settings" element={<CompanySettings />} />
          <Route path="/company/register-branch" element={<RegisterBranch />} />
          <Route path="/company/branch/:idBranch" element={<Branch />} />
          <Route path="/company/reports/new-trends" element={<TrendsReports />} />
          <Route path="/company/reports/new-trends/:idBranch/:idInforme" element={<Trend />} />
          <Route path="/company/reports/new-trends/:idBranch/:idInforme/:category/:position" element={<Product />} />
          <Route path="/company/reports/sales-forecasting" element={<SalesForecastingReports />} />
          <Route path="/company/reports/sales-forecasting/:idBranch/:idInforme" element={<SalesForecasting />} />
          <Route path="/company/reports/next-orders" element={<NextOrdersReports />} />
          <Route path="/company/reports/next-orders/:idBranch/:idInforme" element={<NextOrders />} />
          {/* <Route path="/company/reports/next-orders" element={<NextOrdersReports />} /> */}
          <Route path="/company/reports/anti-obsolescense/:idBranch/:idInforme" element={<Obsolescense />} />
        </Routes>
      </section>
    </BrowserRouter>
  )
}