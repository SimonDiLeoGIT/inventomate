import search from '../assets/icons/search-.svg'

export const Searcher = () => {
  return (
    <form className="-bg--color-border-very-lightest-grey p-2 rounded-lg w-full flex max-w-sm m-auto mr-0">
      <input type="text" placeholder="Search" className="-bg--color-border-very-lightest-grey w-full " />
      <img src={search} className="w-4" />
    </form>
  )
}