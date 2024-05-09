import { MoonLoader } from "react-spinners"

export const WaitingResponse = () => {
  return (
    <div className="p-2 mt-4">
      <MoonLoader
        className="m-auto"
        color={"#1E1E1E"}
        size={24}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}