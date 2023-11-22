import { XMarkIcon } from '@heroicons/react/24/solid'


const OrderCard = props => {
    const { title, imageUrl, price, handleDelete, id } = props
    let renderXMarkIcon 
    if (handleDelete) {
        renderXMarkIcon = <XMarkIcon onClick={() => handleDelete(id)} className="h-6 w-6 text-black cursor-pointer" />
    } 
   
    return (
        <div className='flex justify-between items-center ml-4 mb-4'>
            <div className='flex justify-center gap-2'>
                <figure className='w-20 h-20'>
                    <img className='w-full h-full rounded-lg object-cover flex ' src={imageUrl} alt={title} />
                </figure>
                <p className='text-sm font-light flex flex-row items-center ml-2'>{title}</p>
            </div>
            <div className='flex justify-center gap-2'>
             <p className='text-lg font-medium flex mr-5'>${price}</p> 
                {renderXMarkIcon}
            </div>
        </div>
    )
}

export default OrderCard