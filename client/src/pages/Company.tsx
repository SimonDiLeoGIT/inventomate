import { SideNavbar } from "../components/SideNavbar";
import { useUser } from "../hook/useUser";

export const Company = () => {

  const { currentUser } = useUser()

  return (
    <main className="grid grid-cols-4 -text--color-black">
      <section className="">
        <SideNavbar />
      </section>
      <section className="col-span-3 mt-4">
        <div className="flex items-center">
          <img src={currentUser?.empresa?.logo} className='w-20 mr-4' />
          <h1 className="text-xl font-bold">{currentUser?.empresa?.nombreEmpresa}</h1>
        </div>
        <ul>
          <li>
            <p>creator</p>
            <img />
            <p>{currentUser?.nickname}</p>
            <p>{currentUser?.email}</p>
          </li>
        </ul>
      </section>
    </main>
  );
};
