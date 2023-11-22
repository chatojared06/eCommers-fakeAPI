import { ChevronRightIcon } from '@heroicons/react/24/solid'


const OrdersCard = props => {
    const { totalPrice, totalProducts } = props
   
    return (
        <div className='flex justify-between items-center ml-4 mb-4 border bg-blue-100 rounded-2xl p-4 w-80'>
            <div className='flex justify-between w-full'>
                <p className='flex flex-col'>
                    <span className='font-ligth'>01.02.23</span>
                    <span className='font-ligth'>{totalProducts} articles</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='font-medium text-xl'>$ {totalPrice}</span>
                    <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
                </p>
            </div>
        </div>
    )
}

export default OrdersCard