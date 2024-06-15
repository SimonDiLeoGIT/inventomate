import { useEffect, useState } from "react";
import { AdminReportsNavbar } from "../../components/Admin/AdminReportsNavbar";
import { useUser } from "../../hook/useUser";
import { useAuth0 } from "@auth0/auth0-react";
import { getRatingStats, getRatings } from "../../utils/Services/Admin/rating.service";
import { RatingStatsData } from "../../components/Admin/ReportRating/RatingStatsData";
import { RatingOverview } from "../../components/Admin/ReportRating/RatingOverview";

export const RatingReports = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const { setUser } = useUser()

  const [ratingStats, setRatingStats] = useState<RatingStats>()
  const [ratingOverview, setRatingOverview] = useState<Rating>()
  const [myAccessToken, setAccesToken] = useState<string>('')

  useEffect(() => {

    const getToken = async () => {
      const accessToken = await getAccessTokenSilently()
      setUser(accessToken)
      setAccesToken(accessToken)
      const response = await getRatingStats(accessToken)
      setRatingStats(response)
      getRatingData(accessToken, 0, 10, 'id', 'asc', null, null, null)
    }

    isAuthenticated && getToken()

  }, [isAuthenticated])

  const getRatingData = async (accessToken: string, currentPage: number, size: number, sort: keyof RatingContent, order: 'asc' | 'desc', reportType: string | null, from: string | null, to: string | null) => {
    const overview = await getRatings(accessToken, currentPage, size, sort, order, reportType, from, to)
    setRatingOverview(overview)
  }

  return (
    <main className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
      <AdminReportsNavbar />
      <div className="my-4 grid gap-4">
        {ratingStats && <RatingStatsData stats={ratingStats} />}
        {ratingOverview && <RatingOverview data={ratingOverview} accessToken={myAccessToken} getRatingData={getRatingData} />}
      </div>
    </main>
  )
}