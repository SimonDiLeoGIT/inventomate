import treds_icon from '../assets/icons/violet-new-trends.svg'

interface props {
  title: string
}

export const ReportHeaderTitle: React.FC<props> = ({ title }) => {

  return (
    <div className="flex items-center">
      <div className='mr-1 -bg--color-light-opaque-pink inline-block rounded-full p-1 border -border--color-semidark-violet shadow-md -shadow--color-semidark-violet'>
        <img src={treds_icon} className='w-4' />
      </div>
      <h1 className="font-bold -text--color-semidark-violet text-2xl">{title}</h1>
    </div>

  )
}