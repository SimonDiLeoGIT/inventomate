import help_1 from '../../assets/images/RegisterDatabase1.png'
import help_2 from '../../assets/images/RegisterDatabase2.png'
import help_3 from '../../assets/images/RegisterDatabase3.png'
import help_4 from '../../assets/images/RegisterDatabase4.png'

export const HelpRegisterDatabase = () => {
  return (
    <details>
      <summary className="list-none p-4 font-semibo text-lg -text--color-semidark-violet border-b hover:opacity-80 hover:cursor-pointer shadow-md">
        Register Your Company Database
      </summary>
      <ol className='p-4'>
        <li className='mb-2'>
          1. You will see a red dot on the "Company Settings" buttom. Click on the button
          <img src={help_1} />
        </li>
        <li className='mb-2'>
          2. Click on the edit button
          <img src={help_2} />
        </li>
        <li className='mb-2'>
          3. Complete the required fields to register your database connection
          <img src={help_3} />
        </li>
        <li className='mb-2'>
          4. After clicking on the "Register" button. You may see the following message "Database successfully connected".
          <img src={help_4} />
        </li>
      </ol>
    </details>
  )
}