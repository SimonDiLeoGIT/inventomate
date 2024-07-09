import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/images/InventoMate-logo.png"
import { useEffect } from "react";
import { useUser } from "../hook/useUser";
import { Helmet } from "react-helmet";
import { HelpSteps } from "../components/Helps/HelpSteps";

export const HelpPage = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { setUser } = useUser()

  useEffect(() => {
    document.title = 'InventoMate | Help'
  }, [])

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