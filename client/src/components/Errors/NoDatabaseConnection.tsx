import warning_icon from '../../assets/icons/warning.svg'

export const NoDatabaseConnection = () => {
  return (
    <section className="-bg--color-border-very-lightest-grey h-96 grid place-content-center gap-8 p-8 shadow-md -shadow--color-border-light-grey mt-4 ">
      <p className="font-semibold text-center -text--color-border-light-grey">
        We could not find a connection to the database.
        Make sure you have configured the connection correctly
      </p>
      <img src={warning_icon} className="w-20 m-auto" />
    </section>
  )
}