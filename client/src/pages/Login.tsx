import { useAuth0 } from '@auth0/auth0-react'

export const Login = () => {

  const { loginWithRedirect } = useAuth0()

  const signup = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup'
      }
    })
  }

  return (
    <div className='mt-8'>
      <button
        className='-bg--color-semidark-violet -text--color-white border-2 -border--color-semidark-violet w-32 md:w-40 py-3 text-2xl rounded-2xl font-bold hover:opacity-80 mr-2'
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
      <button
        className='-bg--color-white -text--color-semidark-violet border-2 -border--color-semidark-violet w-32 md:w-40 py-3 text-2xl rounded-2xl font-bold hover:-bg--color-light-opaque-pink hover:opacity-80 mx-2'
        onClick={() => signup()}
      >
        Sign Up
      </button>
    </div>
  )
}