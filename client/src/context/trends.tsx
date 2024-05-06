import { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode
}

type TrendsContext = {
  newTrends: Trends | null,
  setTrends: (trends: Trends) => void,
}

export const TrendsContext = createContext({} as TrendsContext)

export const TrendsProvider = ({ children }: Props) => {

  const [newTrends, setNewTrends] = useState<Trends | null>(null)

  const setTrends = async (trends: Trends) => {
    setNewTrends(trends)
  }

  return (
    <TrendsContext.Provider value={{
      newTrends,
      setTrends
    }}
    >
      {children}
    </TrendsContext.Provider>
  )
}