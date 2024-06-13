import { Loading } from "../../pages/Loading"

export const Requesting = () => {
  return (
    <div className="fixed bottom-0 top-20 right-0 left-0 -z-50 lg:left-64">
      <Loading />
    </div>
  )
}