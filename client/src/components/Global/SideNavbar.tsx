import { useUser } from "../../hook/useUser"
import { MenuOptions } from "./MenuOptions"

export const SideNavbar = () => {

  const { currentUser } = useUser()

  return (
    <nav className="text-color-black shadow-lg -shadow--color-black-shadow w-64 fixed left-0 top-20 bottom-0 hidden lg:block">
      <header className="p-2">
        <h2 className="font-semibold text-lg">{currentUser?.empresa?.nombreEmpresa}</h2>
      </header>
      <MenuOptions />
    </nav >
  )
}