import { useContext, useState, useRef } from "react"
import { Link, Navigate } from "react-router-dom"
import { ShoppingCardProvider } from "../../Context"
import Layout from "../../Componets/Layout"

function SignIn () {
    const context = useContext (ShoppingCardProvider)
    const [view, setView] = useState('user-info')
    const form = useRef(null)
    
    //Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    //has an account 
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true   
    const noAccountInLocalState = context && context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState 

    const handleSignIn =() => {
        const strigifiedSignOut = JSON.stringify(false)
        localStorage.setItem('sign-out', strigifiedSignOut)
        context.setSignOut(false)

        return <Navigate replace to={'/'}/>
    }

    const createAnAccount = () => {
		const formData = new FormData(form.current)
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password')
		}

        const stringifiedAcconut = JSON.stringify(data)
        localStorage.setItem('account', stringifiedAcconut)
        context.setAccount(data)

        handleSignIn()
	}


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
                        onClick={() => handleSignIn()}
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
            <form ref={form} className="flex flex-col gap-4 w-80">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="mb-2 mt-2 text-lg font-semibold" >Your name:</label>
                    <input 
                    type="text"
                    id="name" 
                    name="name"
                    defaultValue={parsedAccount?.name}
                    placeholder="Oscar"
                    className="rounded-lg bg-slate-200 w-80 p-4 focus:outline-none text-lg"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="mb-2 mt-2 text-lg font-semibold" >Your email:</label>
                        <input 
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={parsedAccount?.email} 
                        placeholder="example@gmail.com"
                        className="rounded-lg bg-slate-200 w-80 p-4 focus:outline-none text-lg"/>

                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="mb-2 mt-2 text-lg font-semibold" >Your password:</label>
                        <input
                        type="text"
                        id="password"
                        name="password"
                        defaultValue={parsedAccount?.password} 
                        placeholder="********"
                        className="rounded-lg bg-slate-200 w-80 p-4 focus:outline-none text-lg"/>
                </div>
                <Link to="/" >
                    <button 
                    className="bg-black text-white w-full rounded-lg py-3"
                    onClick={() => createAnAccount()}>
                        Create
                    </button>
                </Link>

            </form>
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