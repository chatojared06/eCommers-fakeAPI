import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCardProvider } from "../../Context"
import Layout from "../../Componets/Layout"

function SignIn () {
    const context = useContext (ShoppingCardProvider)
    const [view, setView] = useState('user-info')
    
    //Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    //has an account 
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true   
    const noAccountInLocalState = context && context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState 

    const renderLogIn = () => {
        return (
            <><h1 className='font-medium text-xl text-center mb-6 w-80'>Welcome</h1>
            <div className='flex flex-col w-80'>
                <p>
                    <span className='font-semibold text-sm'>Email: </span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <p>
                    <span className='font-semibold text-sm'>Password: </span>
                    <span>{parsedAccount?.password}</span>
                </p>
                <Link
                    to='/'>
                    <button
                        className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'
                        disabled={!hasUserAnAccount}
                    >
                        Log in
                    </button>
                </Link>
                <div className="text-center">
                    <a className='text-xs underline underline-offset-4' href='/'>Forgot my password</a>
                </div>
                <button
                    className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3"
                    onClick={() => setView('create-user-info')}
                    disabled={hasUserAnAccount}
                >
                    Sign up
                </button>
            </div></>
        )
    }
    const renderCreateUserInfo = () => {
        return (
            <div>
                <h1 className='font-medium text-xl text-center mb-6 w-80'>Sign Up</h1>
                <p className='flex flex-col'>
                    <span className='mt-4 mb-4 text-lg font-semibold '>Email address</span>
                    <input type="text" 
                    placeholder="example@gmail.com"
                    className=" rounded-lg bg-slate-200 w-80 p-4 mb-4 focus:outline-none text-lg " />
                </p>
                <p className='flex flex-col'>
                    <span className='text-lg font-semibold '>Password *</span>
                    <input type="text" 
                    placeholder="********"
                    className=" rounded-lg bg-slate-200 w-80 p-4 mt-4 mb-4 focus:outline-none text-lg " />
                    <span className='text-xs mb-4'>* The password must contain: uppercase, lowercase and characters</span>
                </p> 
                <button className='mt-10 bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 '>
                        Sign in
                </button>
            </div>
        ) 
    }
    const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()
    

    return (
        <Layout>
            {renderView()}
        </Layout>
        
    )
  }
  
  export default SignIn