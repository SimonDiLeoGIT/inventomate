import { useState } from "react";

interface ReportTypes {
  rating: boolean
  cantAndResponseTime: boolean
  errors: boolean
}

export const AdminReports = () => {

  const [reportType, setReportType] = useState<ReportTypes>({
    rating: true,
    cantAndResponseTime: false,
    errors: false
  })

  const handleReportTypeChange = (field: keyof ReportTypes) => {
    setReportType({
      rating: false,
      cantAndResponseTime: false,
      errors: false,
      [field]: true
    });
  };

  return (
    <main className="m-auto mt-4 w-11/12 lg:w-7/12 xl:w-7/12">
      <header className="my-2 flex border-b-2 -text--color-mate-dark-violet -border--color-mate-dark-violet">
        <h2
          className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${reportType.rating && "-bg--color-black bg-opacity-10"} `}
          onClick={() => handleReportTypeChange('rating')}
        >
          Reports Assessment
        </h2>
        <h2
          className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${reportType.cantAndResponseTime && "-bg--color-black bg-opacity-10"} `}
          onClick={() => handleReportTypeChange('cantAndResponseTime')}
        >
          Quantity & Response Time
        </h2>
        <h2
          className={`text-lg font-semibold p-4 px-8 hover:cursor-pointer hover:opacity-80 ${reportType.errors && "-bg--color-black bg-opacity-10"} `}
          onClick={() => handleReportTypeChange('errors')}
        >
          Errors
        </h2>
      </header>
    </main>
  )
}