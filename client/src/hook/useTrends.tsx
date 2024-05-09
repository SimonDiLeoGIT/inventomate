import { useContext } from "react";
import { TrendsContext } from "../context/trends";

export const useTrends = () => {
  const context = useContext(TrendsContext)

  if (context === undefined) {
    throw new Error('useTrends must be used within a TrendsProvider')
  }

  return context
}