
interface props {
  setDateFrom: (dateFrom: string | null) => void
  setDateTo: (dateTo: string | null) => void
}

export const Filters: React.FC<props> = ({ setDateFrom, setDateTo }) => {

  return (
    <form className="grid grid-cols-2 gap-4 mt-2 mb-4">
      <div>
        <label className="-text--color-mate-dark-violet font-semibold">From</label>
        <input
          type="date"
          className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
          onChange={(e) => setDateFrom(e.target.value)}
        />
      </div>
      <div>
        <label className="-text--color-mate-dark-violet font-semibold">To</label>
        <input
          type="date"
          className="w-full -bg--color-border-very-lightest-grey p-2 hover:cursor-pointer rounded-lg shadow-md -shadow--color-light-opaque-pink"
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
    </form>
  )
}