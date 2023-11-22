import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import './style.css'
import { ShoppingCardContext } from '../../Context'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../utils'
import './style.css'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCardContext)

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(products => products.id != id)
        context.setCartProducts(filteredProducts)
    }

const handleCheckout = () => {
    const orderToAdd = {
      date: '01.02.23',
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }

    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    }
    
    return (
        <aside 
        className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} Checkout-side-menu flex-col fixed right-0 border rounded-lg bg-blue-100`}>
            <div className='flex justify-between item-center p-6'>
                <h2 className='font-medium text-xl'>MyOrder</h2>
                <div onClick={() => context.closeCheckoutSideMenu()}>
                <XMarkIcon className="h-6 w-6 text-black cursor-pointer" />
                </div>
            </div>
            <div className='overflow-y-scroll flex-1'>
            {
                context.cartProducts.map(product => (
                    <OrderCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    imageUrl={product.images}
                    price={product.price}
                    handleDelete={handleDelete}
                    />
                ))
                }
            </div>
            <div className='px-6 mb-6'>
                <p className='flex justify-between item-center mb-2'>
                    <span className='font-medium '>Total:</span>
                    <span className='font-medium text-xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to= '/my-orders/last'>
                 <button className='w-full bg-black py-3 text-white rounded-lg' onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>

        </aside>
    )
}

export default CheckoutSideMenu 
 