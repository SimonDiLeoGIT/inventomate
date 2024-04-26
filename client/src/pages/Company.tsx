import { SideNavbar } from "../components/SideNavbar";

export const Company = () => {

  return (
    <main className="grid grid-cols-4">
      <SideNavbar />
      <section className="col-span-3">
        <section>
          <h1>Company name</h1>
          <ul>
            <li>
              <p>creator</p>
              <img />
              <p>username</p>
              <p>useremail</p>
            </li>
          </ul>
        </section>
      </section>
    </main>
  );
};
