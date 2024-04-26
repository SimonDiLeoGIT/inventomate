
interface Props {
  analysis_icon_url: string
  title: string
  text: string
}

export const Card: React.FC<Props> = ({ analysis_icon_url, title, text }) => {

  return (
    <article className='-bg--color-light-pink rounded-xl p-4 shadow-md -shadow--color-black-shadow mt-8 xl:mt-16 h-40 xl:h-auto'>
      <header className='flex items-center'>
        <div className='mr-1 -bg--color-light-opaque-pink inline-block rounded-full p-1 border -border--color-semidark-violet shadow-md -shadow--color-semidark-violet'>
          <img src={analysis_icon_url} alt={title} className='w-4' />
        </div>
        <h2 className='font-bold text-md'>{title}</h2>
      </header>
      <p className='-text--color-mate-dark-violet font-semibold mt-2 mx-2 text-lg'>{text}</p>
    </article>
  )
}