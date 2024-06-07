import { useAuth0 } from "@auth0/auth0-react";
import { LogoSubtitles } from "../components/LogoSubtitles";
import logo from "../assets/images/InventoMate-logo.png"
import violet_analysis_icon from "../assets/icons/violet-forecasting.svg"
import violet_trend_icon from "../assets/icons/violet-new-trends.svg"
import violet_report from "../assets/icons/violet-report.svg"
import inventory_icon from "../assets/icons/file-tray-full-outline.svg"
import { Card } from '../components/Card'
import { useEffect } from "react";
import { useUser } from "../hook/useUser";
import { HomeOptions } from "../components/HomeOptions";
import { Helmet } from "react-helmet";
import { HelpSteps } from "../components/Helps/HelpSteps";

export const HelpPage = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { setUser } = useUser()

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <main className="w-full relative">
      <Helmet>
        <title>Inventomate | Help</title>
        <link rel="canonical" type="image/png" href={logo} />
      </Helmet>
      <section className="m-auto max-w-5xl">
        <section className='m-2'>
          <h1 className='font-extrabold font-roboto text-4xl xl:text-5xl'>
            Welcome to <span className="-text--color-semidark-violet ">InventoMate!</span>
          </h1>
          <p className="-text--color-black font-medium mt-2">
            If is it your first time using <span className="-text--color-semidark-violet">InventoMate</span>, you might need some help.
            Follow the steps below to start using InventoMate and <span className="-text--color-semidark-violet">improve your sales.</span>
          </p>
        </section>
        <HelpSteps />
      </section>
    </main>
  )
}