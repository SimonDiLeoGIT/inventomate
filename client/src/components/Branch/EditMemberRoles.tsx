import React, { useEffect, useState } from "react"
import { editMemberRoles, getMembertRoles, getRoles } from "../../utils/Services/roles.database.service"
import { useAuth0 } from "@auth0/auth0-react"
import close_icon from '../../assets/icons/close.svg'
import { WaitingResponse } from "../Messages/WaitingResponse"
import { DoneMessage } from "../Messages/DoneMessage"
import done from '../../assets/icons/done.svg'

interface props {
  idBranch: string | undefined
  user: User
}

export const EditMemberRoles: React.FC<props> = ({ idBranch, user }) => {


  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [roles, setRoles] = useState<Rol[] | null>(null)
  const [rolesSelected, setRolesSelected] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()

      const response = await getRoles(accessToken)
      setRoles(response)

      if (idBranch !== undefined) {
        const memberPermissions = await getMembertRoles(accessToken, idBranch, user.idUsuario)
        console.log(memberPermissions)
        const newRolesSelected = memberPermissions?.map(rol => rol.idRol) || [];
        setRolesSelected([...rolesSelected, ...newRolesSelected]);
      }
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])


  function handleMenuOpen() {
    !isOpen ?
      document.body.classList.add('none-scroll')
      :
      document.body.classList.remove('none-scroll')
    setIsOpen(!isOpen)
  }



  const handleRoleSelect = (e: any) => {
    const { value, checked } = e.target;
    const idRol = parseInt(value)
    if (checked) {
      setRolesSelected([...rolesSelected, idRol])
    } else {
      setRolesSelected(rolesSelected.filter(opcion => opcion !== idRol));
    }
    console.log(checked)
    console.log(value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    if (rolesSelected.length === 0) {
      alert("You must select at least one role for the user.");
    } else if (idBranch !== undefined) {
      console.log(rolesSelected)
      const accessToken = await getAccessTokenSilently()
      await editMemberRoles(accessToken, idBranch, user.idUsuario, rolesSelected)
      handleMenuOpen()
      setShow(true)
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
        setTimeout(() => {
          setShow(false)
        }, 2000)
      }, 2000)
    }
    setLoading(false)
  }

  return (
    <>
      <button
        className="h-full w-full hover:cursor-pointer"
        onClick={handleMenuOpen}
      >
        <img src={user?.picture} className="w-12 rounded-full m-auto" />
        {user?.nickname}
      </button>

      <aside className={`fixed w-screen h-screen overflow-hidden top-0 left-0 ${!isOpen && 'hidden'} opacity-animation grid place-content-center`}>
        <section className='-bg--color-white p-4 relative w-80 md:w-96 '>
          <header>
            <h1 className="text-lg font-semibold">{user.nickname}</h1>
            <button
              className="absolute right-4 top-4"
              onClick={() => handleMenuOpen()}
            >
              <img src={close_icon} className="w-5" />
            </button>
          </header>
          <form className="relative" onSubmit={handleSubmit}>
            <div className="mt-2">
              <label className="text-sm">Roles</label>
              <ul className="grid gap-2">
                {
                  roles?.map((role) => {
                    return (
                      <li className="p-2 flex items-center -bg--color-border-very-lightest-grey rounded-lg w-full">
                        <p>{role.nombreRol}</p>
                        <input
                          type="checkbox"
                          value={role.idRol}
                          className="m-auto mr-0 hover:cursor-pointer"
                          onChange={handleRoleSelect}
                          checked={rolesSelected?.some(rol => rol === role.idRol)}
                        />
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="mt-4">
              {
                !loading
                  ?
                  <button
                    type="submit"
                    className="-bg--color-semidark-violet font-bold -text--color-white w-full  p-2 rounded-lg hover:opacity-80"
                  >
                    Confirm
                  </button>
                  :
                  <WaitingResponse message="Editing Roles" />
              }
            </div>
          </form>
        </section>
      </aside>
      {
        show
        &&
        <DoneMessage message="¡Roles successfully changed!" visible={visible} image={done} />
      }
    </>
  )
}