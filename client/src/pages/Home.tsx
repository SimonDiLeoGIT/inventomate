import { useAuth0 } from '@auth0/auth0-react';
import { Login } from './Login';
import axios from 'axios'
import { useEffect, useState } from 'react';

export const Home = () => {
  const { isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0();

  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtenemos el token de acceso
        const accessToken = await getAccessTokenSilently();

        // Configuramos el encabezado de autorización con el token de acceso
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };

        // Hacemos una solicitud al backend protegido
        const response = await axios.get('http://localhost:4040/api/messages/admin', config);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }

    console.log(data)
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!isAuthenticated) {
    return "No autenticado"
    // return <Login />
  }

  return (
    <section className='grid place-content-center mt-40'>
      <div className='text-center'>
        <img className='m-auto' src={user?.picture} alt={user?.name} />
        <h2 className='font-bold'>{user?.name}</h2>
        <p>{user?.email}</p>
        <p>{data?.text}</p>
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
