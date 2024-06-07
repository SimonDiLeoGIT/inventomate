import help_1 from '../../assets/images/RequestReport1.png'
import help_2 from '../../assets/images/RequestReport2.png'
import help_3 from '../../assets/images/RequestReport3.png'
import help_4 from '../../assets/images/RequestReport4.png'
import help_5 from '../../assets/images/RequestReport5.png'

export const HelpReportRequest = () => {
  return (
    <details>
      <summary className="list-none p-4 font-semibo text-lg -text--color-semidark-violet border-b hover:opacity-80 hover:cursor-pointer shadow-md">
        Request A Report
      </summary>
      <ol className='p-4'>
        <li className='mb-2'>
          1. Click on any report on the left of the screen
        </li>
        <li className='mb-2'>
          2. If you are the owner you can select any branch
          <img src={help_1} />
        </li>
        <li className='mb-2'>
          3. Press the button and wait
          <img src={help_2} />
          <img src={help_3} />
        </li>
        <li className='mb-2'>
          4. You will receive an email when the report is finished. Click on the new report
          <img src={help_4} />
        </li>
        <li className='mb-2'>
          5. You can see your new report
          <img src={help_5} />
        </li>
      </ol>
    </details>
  )
}