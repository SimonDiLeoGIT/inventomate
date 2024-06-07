import help_1 from '../../assets/images/RegisterDatabase1.png'
import help_2 from '../../assets/images/RegisterBranch.png'

export const HelpRegisterBranch = () => {
  return (
    <details>
      <summary className="list-none p-4 font-semibo text-lg -text--color-semidark-violet border-b hover:opacity-80 hover:cursor-pointer shadow-md">
        Register A New Company Branch
      </summary>
      <ol className='p-4'>
        <li className='mb-2'>
          1. Click on the "Add Branch" button
          <img src={help_1} />
        </li>
        <li className='mb-2'>
          2. Complete the required fields and press on the "Register" button
          <img src={help_2} />
        </li>
      </ol>
    </details>
  )
}