import { useContext } from 'react'
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import { ShoppingCardContext, ShoppingCardProvider, initializeLocalStorage,  } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Componets/Navbar'
import CheckoutSideMenu from '../../Componets/CheckoutSideMenu'
import './App.css'

const AppRoutes = () => {
  const context = useContext(ShoppingCardContext)
  //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Sign Out 
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut
  //has an account 
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true   
  const noAccountInLocalState = context && context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState 


  let routes = useRoutes ([
    { path:'/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>},
    { path:'/clothes', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>},
    { path:'/shoes', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>},
    { path:'/electronics', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>},
    { path:'/forniture', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>},
    { path:'/toys', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>},
    { path:'/miscellaneous', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>},
    { path:'/my-account', element: <MyAccount /> },
    { path:'/my-order', element: <MyOrder /> },
    { path:'/my-orders', element: <MyOrders /> },
    { path:'/my-orders/last', element: <MyOrder /> },
    { path:'/my-orders/:id', element: <MyOrder /> },
    { path:'/sign-in', element: <SignIn /> },
    { path:'/*', element: <NotFound /> },

  ])  
  return routes
}

const App = () => {
  initializeLocalStorage()

  return (
    <ShoppingCardProvider>
      <BrowserRouter>
        <AppRoutes/>
          <Navbar/>
          <CheckoutSideMenu/>
      </BrowserRouter>      
    </ShoppingCardProvider>
  )
}

export default App
