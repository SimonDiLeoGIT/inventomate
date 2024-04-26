import { ReactNode, createContext, useState } from "react";
import { getUser } from "../utils/Database.service";


interface Props {
  children: ReactNode
}

type UserContext = {
  currentUser: User | null,
  setUser: (accessToken: string) => void,
}

export const UserContext = createContext({} as UserContext)

export const UserProvider = ({ children }: Props) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const setUser = async (accessToken: string) => {
    try {
      const user = await getUser(accessToken)

      // if (user === null) {
      //   signUpUser(accessToken)

      //   try {
      //     const response = await getUser(accessToken)
      //     const user = response
      //     setCurrentUser(user)
      //   } catch (error) {
      //     console.error("Error al obtener el usuario:", error)
      //     setCurrentUser(null)
      //   }
      // }

      setCurrentUser(user)
    } catch (error) {
      console.error("Error al obtener el usuario:", error)
      setCurrentUser(null)
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