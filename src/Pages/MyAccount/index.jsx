import { useContext, useState, useRef } from "react"
import { ShoppingCardContext } from "../../Context"
import Layout from "../../Componets/Layout"

function MyAccount () {
  const context = useContext (ShoppingCardContext)
  const [view, setView] = useState ('user-info')
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  const form = useRef (null)

  const editAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    // Update account 
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)
  }
  
  const renderUserInfo = () => {
    return (
      <div className="flex flex-col w-80">
        <p>
          <span className="font-light text-m">Name: </span>
          <span>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className="font-light text-m">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <button 
        className='border border-black rounded-lg mt-6 py-3'
        onClick={() => setView('edit-user-info')}
        >
          Edit
        </button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
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
          <button 
          className="bg-black text-white w-full rounded-lg py-3"
          onClick={() => {setView('user-info'), editAccount()}}>
            Edit
          </button>
      </form>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()





  return (
      <Layout>
        <h1 className="font-medium text-xl text-center mb-6 w-80"> My Account</h1>
        {renderView()}
      </Layout>
      
  )
}

export default MyAccount
