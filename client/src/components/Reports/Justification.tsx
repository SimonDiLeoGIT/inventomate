import info_icon from '../../assets/icons/info.svg'

interface props {
  justificacion: string
}

export const Justification: React.FC<props> = ({ justificacion }) => {
  return (
    <div className='flex items-start space-x-2 -bg--color-border-very-lightest-grey p-4 bg-opacity-50 rounded-lg shadow-lg -shadow--color-black-shadow'>
      <img src={info_icon} className='w-4 mt-1' />
      <p className='text-sm'>
        {justificacion}
      </p>
    </div>
  )
}