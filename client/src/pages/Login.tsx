import { useAuth0 } from '@auth0/auth0-react'

export const Login = () => {

  const { loginWithRedirect } = useAuth0()

  return (
    <section className='grid place-content-center h-screen'>
      <button
        className='bg-color-light-orange w-48 h-12 rounded-lg font-bold text-gray-800 hover:opacity-80'
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
    </section>
  )
}