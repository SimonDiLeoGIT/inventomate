import { useAuth0 } from '@auth0/auth0-react'
import logo from "../assets/images/InventoMate-logo.png"
import analysis_icon from "../assets/icons/analytics-outline.svg"
import trend_icon from "../assets/icons/trending-up-outline.svg"
import cart_icon from "../assets/icons/cart-outline.svg"
import inventory_icon from "../assets/icons/file-tray-full-outline.svg"
import { Card } from '../components/Card'
import { LogoSubtitles } from '../components/LogoSubtitles'

export const Login = () => {

  const { loginWithRedirect } = useAuth0()

  return (
    <main className='-text--color-black'>
      <section className='w-8/12 m-auto grid grid-cols-2 mt-14 '>
        <section className='place-content-center w-9/12 m-auto ml-0'>
          <h1 className='font-extrabold font-roboto text-5xl py-4'>
            Improve your sales with <span className='-text--color-semidark-violet'>InventoMate</span>
          </h1>
          <h2 className='text-lg font-semibold -text--color-mate-dark-violet'>The predictive system to improve inventory management.</h2>
          <div className='mt-16'>
            <button
              className='-bg--color-semidark-violet -text--color-white w-40 py-3 text-2xl rounded-2xl font-bold hover:opacity-80 mr-2'
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
            <button
              className='-bg--color-white -text--color-semidark-violet border-2 -border--color-semidark-violet w-40 py-3 text-2xl rounded-2xl font-bold hover:-bg--color-light-opaque-pink hover:opacity-80 mx-2'
              onClick={() => loginWithRedirect()}
            >
              Register
            </button>
          </div>
        </section>
        <section className='place-content-center inline-block m-auto'>
          <img src={logo} alt='InventoMate' className='m-auto w-6/12' />
          <LogoSubtitles />
        </section>
      </section>
      <section className='w-8/12 m-auto mt-16 grid grid-cols-4 gap-4'>
        <Card analysis_icon_url={analysis_icon} title='Predictive Sales Analysis' text='Provides a projection analysis for you to know the future of your business.' />
        <Card analysis_icon_url={trend_icon} title='Trend Analisys' text='Learn about new trends in the marketplace to improve your business' />
        <Card analysis_icon_url={inventory_icon} title='Suggested Purchases' text="Don't run out of stock. Keep your inventory up to date." />
        <Card analysis_icon_url={cart_icon} title='Suggested Promotions' text='Optimize your inventory. Forget about stagnant products.' />
      </section>
    </main>
  )
}