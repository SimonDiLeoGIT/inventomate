import { useUser } from "../hook/useUser"
import { MenuOptions } from "./MenuOptions"

export const SideNavbar = () => {

  const { currentUser } = useUser()

  return (
    <nav className="p-2 text-color-black shadow-lg -shadow--color-black-shadow w-72 fixed top-20 bottom-0">
      <header className="p-1">
        <h2 className="font-semibold text-lg">{currentUser?.empresa?.nombreEmpresa}</h2>
      </header>
      <MenuOptions />
    </nav>
  )
}