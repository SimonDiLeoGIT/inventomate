import React from 'react'
import search from '../assets/icons/search-.svg'

interface props {
  handleSearchChange: (input: string) => void
}

export const Searcher: React.FC<props> = ({ handleSearchChange }) => {
  return (
    <form className="-bg--color-border-very-lightest-grey p-2 rounded-lg w-full flex max-w-sm">
      <input
        type="text"
        placeholder="Search"
        className="-bg--color-border-very-lightest-grey w-full "
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <img src={search} className="w-4" />
    </form>
  )
}