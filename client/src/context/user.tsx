import { ReactNode, createContext, useState } from "react";
import { getUser } from "../utils/Database.service";


interface Props {
  children: ReactNode
}

type UserContext = {
  currentUser: UserCompany | null,
  setUser: (accessToken: string) => void,
}

export const UserContext = createContext({} as UserContext)

export const UserProvider = ({ children }: Props) => {

  const [currentUser, setCurrentUser] = useState<UserCompany | null>(null)

  const setUser = async (accessToken: string) => {
    try {
      const user = await getUser(accessToken);

      setCurrentUser(user);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      setCurrentUser(null);
    }

  }

  return (
    <UserContext.Provider value={{
      currentUser,
      setUser
    }}
    >
      {children}
    </UserContext.Provider>
  )
}