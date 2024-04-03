import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {

  const { user, logout } = useAuth0();

  return (
    <nav className="w-full border h-full">
      <ul className="w-full flex h-full items-center">
        <li>
          <h1 className='font-bold ml-4'>InventoMate</h1>
        </li>
        <li className="m-auto mr-4">
          <button
            className='bg-red-300 w-24 h-12 rounded-lg font-bold text-gray-800 hover:opacity-80'
            onClick={() => logout({
              openUrl() {
                window.location.origin;
              }
            })}>
            Log Out
          </button>
        </li>
        <li className="m-auto mr-4 ml-0">
          <img className='rounded-full w-8' src={user?.picture} alt={user?.name} />
        </li>
      </ul>
    </nav>
  )
}