import { useContext } from "react"
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { ShoppingCardContext } from "../../Context"

const ShoppingCart = () => {
    const context = useContext(ShoppingCardContext)

    const openCheckoutCart = () => {
        context.openCheckoutSideMenu()
        context.closeProductDetail()
    }

    return (
        <div className='relative flex gap-0.5 items-center' onClick={() => openCheckoutCart()}> 
            <ShoppingCartIcon className='w-6 h-6 fill-none stroke-black cursor-pointer' />
            <div className='absolute bottom-0.5 left-3.5 flex justify-around items-center rounded-full bg-black w-4 h-4 text-sm text-white'>
                {context.cartProducts.length}
            </div>
        </div>
    )
}
export default ShoppingCart