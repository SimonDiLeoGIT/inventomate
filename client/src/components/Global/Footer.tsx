import { Link } from 'react-router-dom'

export const Footer = () => {

  return (
    <footer className="w-full p-4 mt-8 md:p-1 -bg--color-border-very-lightest-grey bg-opacity-40">
      <div className='w-full max-w-5xl m-auto'>
        <section className='p-2 text-xs -text--color-mate-dark-violet'>
          <p>
            InventoMate is a predictive system aimed at enhancing inventory management. It conducts predictive sales analysis and market trend analysis based on the products sold by the client company.
          </p>
          <p>
            It also generates suggestions with recommendations on which products to purchase to update stock and promotions designed to sell obsolete products.
          </p>
          <section className='text-center md:flex space-x-5 md:mt-4'>
            <p>
              <Link to='/' className='-text--color-semidark-violet'>Home</Link>
            </p>
            <p className=''>
              <Link to='/terms&conditions' className='-text--color-semidark-violet border-b'>Terms & Conditions</Link>
            </p>
          </section>
        </section>
      </div>
    </footer>
  )
}