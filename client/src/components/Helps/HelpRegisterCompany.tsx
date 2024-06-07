import help_1 from '../../assets/images/homepage.png'
import help_2 from '../../assets/images/registerCopany.png'

export const HelpRegisterCompany = () => {
  return (
    <details>
      <summary className="list-none p-4 font-semibo text-lg -text--color-semidark-violet border-b hover:opacity-80 hover:cursor-pointer shadow-md">
        Register Your Company
      </summary>
      <ol className='p-4'>
        <li className='mb-2'>
          <p>1. Click on the "Register Company" button</p>
          <img src={help_1} />
        </li>
        <li className='mb-2'>
          <p>2. Complete the required fields</p>
        </li>
        <li className='mb-2'>
          <p>3. Read Terms & Conditions and then click on the checkbox to accept them</p>
          <img src={help_2} />
        </li>
        <li className='mb-2'>
          <p>4. Click on the "Register" button</p>
        </li>
      </ol>
    </details>
  )
}