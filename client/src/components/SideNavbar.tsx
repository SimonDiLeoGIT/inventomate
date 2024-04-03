import { Link } from "react-router-dom"

export const SideNavbar = () => {
  return (
    <nav className="fixed left-0 border w-56 bottom-0 top-20">
      <header className="p-2">
        <h2 className="font-bold">Actions</h2>
      </header>
      <ul>
        <li className="border rounded-lg">
          <Link
            to='/add-user'
            className="block p-2"
          >
            Add User
          </Link>
        </li>
      </ul>
    </nav>
  )
}