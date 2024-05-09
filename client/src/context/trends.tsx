import { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode
}

type TrendsContext = {
  newTrends: Trends | null,
  setNewTrends: (trends: Trends) => void,
}

export const TrendsContext = createContext({} as TrendsContext)

export const TrendsProvider = ({ children }: Props) => {

  const [newTrends, setNewTrends] = useState<Trends | null>(null)

  return (
    <TrendsContext.Provider value={{
      newTrends,
      setNewTrends
    }}
    >
      {children}
    </TrendsContext.Provider>
  )
}