import empty_icon from '../../assets/icons/empty.svg'

export const EmptyHistory = () => {
  return (
    <section className="-bg--color-border-very-lightest-grey h-96 grid place-content-center gap-8 p-8 shadow-md -shadow--color-border-light-grey mt-4 ">
      <p className="font-semibold text-center -text--color-border-light-grey">
        It seems that you have never asked for a new trends report.
        Please press the "Discover New Trends" button
      </p>
      <img src={empty_icon} className="w-20 m-auto" />
    </section>
  )
}