import empty_icon from '../../assets/icons/empty.svg'

export const SelectBranch = () => {
  return (
    <section className="-bg--color-border-very-lightest-grey h-96 grid place-content-center gap-8 p-8 shadow-md -shadow--color-border-light-grey mt-4 ">
      <p className="font-semibold text-center -text--color-border-light-grey">
        Select Branch and then press the button
      </p>
      <img src={empty_icon} className="w-20 m-auto" />
    </section>
  )
}