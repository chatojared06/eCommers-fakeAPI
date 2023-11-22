import { useContext } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { ShoppingCardContext } from '../../Context' 
import Layout from '../../Componets/Layout'
import OrderCard from '../../Componets/OrderCard'


function MyOrder () {
    const context = useContext(ShoppingCardContext)
    const currentPath = window.location.pathname
    let index = currentPath.substring(currentPath.lastIndexOf('/') +1)
    if (index === 'last') index = context.order?.length - 1 

    return (
        <Layout>
            <div className='flex items-center justify-center relative w-80 mb-6 '>
                <Link to='/my-orders' className='absolute left-0'>  
                <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
                </Link>
          
                <h1 className='font-medium text-xl'> MyOrder</h1>

            </div>
            <div className="w-80 bg-blue-100 rounded-2xl">
                <div className="flex flex-col mt-4">
                    {context.order?.[index]?.products.map((product) => (
                    <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.images}
                        price={product.price}
                    />
                    ))}
                </div>
                </div>
        </Layout>
        
    )
  }
  
  export default MyOrder
  