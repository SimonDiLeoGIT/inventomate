import { useAuth0 } from "@auth0/auth0-react";
import { LogoSubtitles } from "../components/LogoSubtitles";
import logo from "../assets/images/InventoMate-logo.png"
import violet_analysis_icon from "../assets/icons/violet-forecasting.svg"
import violet_trend_icon from "../assets/icons/violet-new-trends.svg"
import violet_report from "../assets/icons/violet-report.svg"
import inventory_icon from "../assets/icons/file-tray-full-outline.svg"
import { Card } from '../components/Card'
import { Login } from "./Login";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../hook/useUser";

export const Home = () => {

  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const { setUser, currentUser } = useUser()

  useEffect(() => {
    console.log('a')
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  return (
    <main className="w-full">
      {/* <button onClick={() => logout({
        openUrl() {
          window.location.href = window.location.origin
        }
      })} className='p-2 flex w-full'><img src={logout_icon} className='w-5 mr-2' />Logout</button> */}

      <section className=' m-auto md:grid grid-cols-2 md:w-11/12 mt-4 md:mt-14 xl:w-9/12'>
        <section className='w-screen m-auto md:hidden'>
          <img src={logo} alt='InventoMate' className='m-auto w-6/12' />
          <LogoSubtitles />
        </section>
        <section className='m-auto text-center md:text-start xl:ml-4'>
          <h1 className='font-extrabold font-roboto text-4xl xl:text-5xl py-4'>
            Improve your sales with <span className='-text--color-semidark-violet'>InventoMate</span>
          </h1>
          <h2 className='text-lg font-semibold -text--color-mate-dark-violet'>The predictive system to improve inventory management.</h2>
          {!isAuthenticated ?
            <Login />
            :
            (currentUser?.empresa === null ?
              <div className="mt-12 inline-block">
                <Link to='/register-company' className="mt-4 block text-center -bg--color-semidark-violet -text--color-white font-bold text-2xl p-4 rounded-2xl border hover:opacity-80"> Register Company </Link>
              </div>
              :
              <div className="mt-12 inline-block">
                <Link to='/company' className="block -bg--color-semidark-violet -text--color-white font-bold text-2xl p-4 rounded-2xl border hover:opacity-80"> View Company </Link>
              </div>
            )
          }
        </section>
        <section className='hidden md:block'>
          <img src={logo} alt='InventoMate' className='m-auto w-6/12' />
          <LogoSubtitles />
        </section>
      </section>
      <section className='w-10/12 m-auto my-4 md:w-11/12 md:grid md:grid-cols-2 xl:grid-cols-4 xl:w-9/12 gap-4 xl:gap-8'>
        <Card image={violet_analysis_icon} title='Predictive Sales Analysis' text='Provides a projection analysis for you to know the future of your business.' />
        <Card image={violet_trend_icon} title='Trend Analisys' text='Learn about new trends in the marketplace to improve your business' />
        <Card image={inventory_icon} title='Suggested Purchases' text="Don't run out of stock. Keep your inventory up to date." />
        <Card image={violet_report} title='Suggested Promotions' text='Optimize your inventory. Forget about stagnant products.' />
      </section>
    </main>
  );
};
