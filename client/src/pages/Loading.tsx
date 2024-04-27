import logo from '../assets/images/InventoMate-logo.png'
import '../styles/loading.css'

export const Loading = () => {
  return (
    <main className='grid place-content-center text-center min-h-screen gap-4 opacidad'>
      <img src={logo} className='w-40' />
      <h1 className='font-semibold text-lg'>Loading...</h1>
    </main>
  )
}