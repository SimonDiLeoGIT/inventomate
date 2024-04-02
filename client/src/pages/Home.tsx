import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";


export const Home = () => {

  const { isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0();

  const [data, setData] = useState();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        // console.log(accessToken)
        const config = {
          url: 'http://localhost:8080/api/roles',
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        console.log(config)
        const response = await axios(config);
        console.log("response", response)
        setData(response.data);
      } catch (error) {
        setError(error as Error);
        console.log(error)
      }
    };

    if (isAuthenticated) {
      fetchData();
    }

  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <section className='grid place-content-center mt-40'>
      Hi!
      <div className='text-center'>
        <img className='m-auto' src={user?.picture} alt={user?.name} />
        <h2 className='font-bold'>{user?.name}</h2>
        <p>{user?.email}</p>
        <button
          className='bg-red-300 w-48 h-12 rounded-lg font-bold text-gray-800 hover:opacity-80 mt-4'
          onClick={() => logout({
            openUrl() {
              window.location.origin;
            }
          })}>
          Log Out
        </button>
      </div>
    </section>
  );
};
