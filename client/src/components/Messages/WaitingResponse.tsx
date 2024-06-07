import React from "react"
import { MoonLoader } from "react-spinners"

interface props {
  message: string
}

export const WaitingResponse: React.FC<props> = ({ message }) => {
  return (
    <div className="p-2 flex items-center justify-center space-x-2 opacidad">
      <MoonLoader
        className=""
        color={"#1E1E1E"}
        size={24}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="-text--color-border-light-grey">{message}</p>
    </div>
  )
}