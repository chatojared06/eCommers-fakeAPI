import { useContext } from 'react'
import Layout from "../../Componets/Layout"
import Card from "../../Componets/Card"
import ProductDetail from '../../Componets/productDetail'
import { ShoppingCardContext } from '../../Context'

function Home() {
  const context = useContext(ShoppingCardContext)

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map((item) => (
          <Card key={item.id} data={item}/>          
        ))        
      )
    } else {
      return (
        <div className='flex items-center justify-center font-medium text-xl'> 
          We do not have anything :( 
        </div>
      )
    }
  }

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center relative w-full mb-4'>         
        <h1 className="font-medium text-xl"> Exclusive Products </h1>
        <input 
          type="text"
          placeholder='Search a product' 
          className='rounded-lg bg-slate-200 w-full max-w-md p-4 mb-4 focus:outline-none'
          onChange={(event) => context.setSearchByTitle(event.target.value)}/>
      </div>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home
