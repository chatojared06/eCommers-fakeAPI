import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCardContext } from "../../Context"

const Navbar = () => {
    const context = useContext(ShoppingCardContext)
    const activeStyle = 'underline underline-offset-4'

    const handleSignOut =() => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true)
    }

    return (
        <nav className= 'flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
            <ul className= 'flex items-center gap-3'>
                <li className= 'font-semibold text-lg'>
                    <NavLink 
                    to='/'
                    onClick={() => context.setSearchByCategory(null)}
                    >
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/'
                    onClick={() => context.setSearchByCategory(null)}
                    className={({ isActive }) =>
                    isActive? activeStyle : undefined
                    }>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/clothes'
                    onClick={() => context.setSearchByCategory('clothes')}
                    className={({ isActive }) =>
                    isActive? activeStyle : undefined
                    }>
                        Clothes 
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/shoes'
                    onClick={() => context.setSearchByCategory('shoes')}
                    className={({ isActive }) =>
                    isActive? activeStyle : undefined
                    }>
                        Shoes 
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/electronics'
                    onClick={() => context.setSearchByCategory('electronics')}
                    className={({ isActive }) =>
                    isActive? activeStyle : undefined
                    }>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/forniture'
                    onClick={() => context.setSearchByCategory('furniture')}
                    className={({ isActive }) =>
                    isActive? activeStyle : undefined
                    }>
                        Fornitures
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/toys'
                    onClick={() => context.setSearchByCategory('toys')}
                    className={({ isActive }) =>
                    isActive? activeStyle : undefined
                    }>
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/miscellaneous'
                    onClick={() => context.setSearchByCategory('miscellaneous')}
                    className={({ isActive }) =>
                    isActive? activeStyle : undefined
                    }>
                        Miscellaneous
                    </NavLink>
                </li>
            </ul>

            <ul className= 'flex items-center gap-3'>
                <li className='text-black/60'>
                    chato@example.com
                </li>
                <li>
                    <NavLink 
                    to='/my-orders'
                    className={({ isActive }) =>
                    isActive? activeStyle : undefined
                    }>
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/my-account'
                    className={({ isActive }) =>
                    isActive? activeStyle : undefined
                    }>
                        My Account 
                    </NavLink>
                </li>
                <li>
                    <NavLink
                     to='/sign-in'
                     className={({ isActive }) =>
                     isActive? activeStyle : undefined
                     }
                     onClick={() => handleSignOut()}>
                        Sign out
                    </NavLink>
                </li>
                <li className='flex items-center'>
                    <ShoppingBagIcon className="h-6 w-6 text-black" />
                     <div>{context.cartProducts.length}</div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar