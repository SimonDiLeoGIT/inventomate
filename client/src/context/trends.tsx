import { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode
}

type TrendsContext = {
  trends: Trends | null,
  setTrends: (trends: Trends | null) => void,
}

export const TrendsContext = createContext({} as TrendsContext)

export const TrendsProvider = ({ children }: Props) => {

  const [trends, setTrends] = useState<Trends | null>(null)

  return (
    <TrendsContext.Provider value={{
      trends,
      setTrends
    }}
    >
      {children}
    </TrendsContext.Provider>
  )
}