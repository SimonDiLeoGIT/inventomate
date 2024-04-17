import { useAuth0 } from '@auth0/auth0-react'
import logo from "../assets/icons/InventoMateLogo.png"
import analysis_icon from "../assets/icons/analytics-outline.svg"

export const Login = () => {

  const { loginWithRedirect } = useAuth0()

  return (
    <main className='-text--color-black'>
      <header className='w-full h-20 overflow-x-hidden'>
        <nav className="w-full border-b -border--color-border-very-light-grey h-20 flex shadow-md fixed top-0">
          <h1 className='font-bold ml-4 h-full flex items-center py-2'>
            <img src={logo} alt="InventoMateLogo" className="h-full" />
            <p>InventoMate</p>
          </h1>
        </nav>
      </header>
      <section className='w-9/12 m-auto grid grid-cols-2 gap-8 mt-20'>
        <section className='place-content-center'>
          <section className='w-9/12 m-auto'>
            <h1 className='font-bold font-roboto text-5xl py-4'>
              Improve your sales with <span className='-text--color-semidark-violet'>InventoMate</span>
            </h1>
            <h2 className='text-lg font-semibold -text--color-mate-dark-violet'>The predictive system to improve inventory management.</h2>
            <div className='mt-12'>
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
        </section>
        <section className='place-content-center'>
          <section className='w-9/12'>
            <img src={logo} alt='InventoMate' className='m-auto w-6/12' />
            <section className='flex items-center justify-center'>
              <div className='mr-2 -bg--color-light-opaque-pink inline-block rounded-full p-1 border -border--color-semidark-violet shadow-md -shadow--color-semidark-violet'>
                <img src={analysis_icon} alt='Analysis' className='w-6' />
              </div>
              <h2 className='font-bold text-lg'>Predictive Sales Analysis</h2>
            </section>
          </section>
        </section>
      </section>
      <section className='w-9/12 m-auto flex space-x-8 mt-24'>
        <article className='-bg--color-light-pink rounded-xl p-4 py-6 shadow-md -shadow--color-black-shadow'>
          <header className='flex items-center'>
            <div className='mr-1 -bg--color-light-opaque-pink inline-block rounded-full p-1 border -border--color-semidark-violet shadow-md -shadow--color-semidark-violet'>
              <img src={analysis_icon} alt='Analysis' className='w-6' />
            </div>
            <h2 className='font-bold text-lg'>Predictive Sales Analysis</h2>
          </header>
          <p className='-text--color-mate-dark-violet font-semibold mt-2 mx-2'>Provides a projection analysis for you to know the future of your business.</p>
        </article>
        <article className='-bg--color-light-pink rounded-xl p-4 py-6 shadow-md -shadow--color-black-shadow'>
          <header className='flex items-center'>
            <div className='mr-1 -bg--color-light-opaque-pink inline-block rounded-full p-1 border -border--color-semidark-violet shadow-md -shadow--color-semidark-violet'>
              <img src={analysis_icon} alt='Analysis' className='w-6' />
            </div>
            <h2 className='font-bold text-lg'>Predictive Sales Analysis</h2>
          </header>
          <p className='-text--color-mate-dark-violet font-semibold mt-2 mx-2'>Provides a projection analysis for you to know the future of your business.</p>
        </article>
        <article className='-bg--color-light-pink rounded-xl p-4 py-6 shadow-md -shadow--color-black-shadow'>
          <header className='flex items-center'>
            <div className='mr-1 -bg--color-light-opaque-pink inline-block rounded-full p-1 border -border--color-semidark-violet shadow-md -shadow--color-semidark-violet'>
              <img src={analysis_icon} alt='Analysis' className='w-6' />
            </div>
            <h2 className='font-bold text-lg'>Predictive Sales Analysis</h2>
          </header>
          <p className='-text--color-mate-dark-violet font-semibold mt-2 mx-2'>Provides a projection analysis for you to know the future of your business.</p>
        </article>
        <article className='-bg--color-light-pink rounded-xl p-4 py-6 shadow-md -shadow--color-black-shadow'>
          <header className='flex items-center'>
            <div className='mr-1 -bg--color-light-opaque-pink inline-block rounded-full p-1 border -border--color-semidark-violet shadow-md -shadow--color-semidark-violet'>
              <img src={analysis_icon} alt='Analysis' className='w-6' />
            </div>
            <h2 className='font-bold text-lg'>Predictive Sales Analysis</h2>
          </header>
          <p className='-text--color-mate-dark-violet font-semibold mt-2 mx-2'>Provides a projection analysis for you to know the future of your business.</p>
        </article>
      </section>
    </main>
  )
}