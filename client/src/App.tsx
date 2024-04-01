import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import { Router } from "./utils/Router"
import { Login } from './pages/Login';


function App() {

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
        const response = await axios.get('http://localhost:4040/api/messages/public');
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
    return <Login />
  }

  return (
    <Router />
  )
}

export default App
