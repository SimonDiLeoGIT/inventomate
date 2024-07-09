import { useAuth0 } from "@auth0/auth0-react"
import { useUser } from "../hook/useUser"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SideNavbar } from "../components/Global/SideNavbar"
import { getBranch } from "../utils/Services/branch.database.service"
import { InviteUser } from "../components/Branch/InviteUser"
import { EditMemberRoles } from "../components/Branch/EditMemberRoles"
import { BranchBanner } from "../components/Branch/BranchBanner"
import { Searcher } from "../components/Searcher"
import { Pagination } from "../components/Global/Pagination"

export const Branch = () => {

  const { idBranch } = useParams()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { currentUser, setUser } = useUser()

  const [branch, setBranch] = useState<BranchCompany>()
  const totalArticles = 10
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [data, setData] = useState<User[]>()
  const [searchInput, setSearchInput] = useState<string>('')

  useEffect(() => {
    document.title = 'InventoMate | Branch'
  }, [])

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      if (idBranch !== undefined) {
        const userBranch = await getBranch(accessToken, idBranch)
        setBranch(userBranch)
      }
    }

    isAuthenticated && getToken()

    setData(branch?.usuarios.slice(currentPage, totalArticles))

  }, [isAuthenticated])

  useEffect(() => {
    setData(branch?.usuarios.slice(currentPage, (currentPage) + totalArticles))
    branch
      &&
      setTotalPages(branch?.usuarios.length / totalArticles)
    searchInput !== '' && search(searchInput)
  }, [branch, currentPage]);

  const handleSearchChange = (input: string) => {
    setSearchInput(input)
    if (input === '') {
      setData(branch?.usuarios.slice(currentPage, (currentPage) + totalArticles))
    } else {
      search(input)
    }
  }

  function search(input: string) {
    let newData: User[] = []
    branch?.usuarios.map(user => {
      const subString = user.nickname.substring(0, input.length)
      if (subString.toLocaleUpperCase() === input.toLocaleUpperCase()) newData.push(user)
    })
    setData(newData.slice(currentPage, (currentPage) + totalArticles))
  }

  const handlePageClick = (event: any) => {
    if (branch) {
      const next = (event.selected * totalArticles) % branch?.usuarios.length;
      setCurrentPage(next)
      setData(branch?.usuarios.slice(next, (next) + totalArticles))
    }
    window.scrollTo(0, 0);
  }

  return (
    <main className="-text--color-black flex">
      <section className="hidden relative lg:block w-64">
        <SideNavbar />
      </section>
      <section className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
        {
          branch
          &&
          <BranchBanner branch={branch} />
        }
        <section className="my-4">
          <h2 className="font-bold -text--color-semidark-violet py-2 text-lg border-b mb-2">Members</h2>
          <div className="grid grid-cols-2">
            <Searcher handleSearchChange={handleSearchChange} />
            {
              idBranch !== undefined && currentUser?.roles.some(rol => rol.idRol === 1)
              &&
              <InviteUser idBranch={idBranch} />
            }
          </div>
          <ul className="my-4 grid w-full m-auto grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {
              data?.map(user => {
                return (
                  <li className="-bg--color-border-very-lightest-grey rounded-xl h-28 md:h-32">
                    {
                      currentUser?.roles.some(rol => rol.idRol === 1)
                        ?
                        <EditMemberRoles idBranch={idBranch} user={user} />
                        :
                        <div
                          className="h-full w-full grid place-content-center"
                        >
                          <img src={user?.picture} className="w-12 rounded-full m-auto" />
                          {user?.nickname}
                        </div>
                    }
                  </li>
                )
              })
            }
          </ul>
        </section>
        <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
      </section>
    </main>
  );
};
