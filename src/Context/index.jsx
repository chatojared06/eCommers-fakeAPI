import { createContext, useState, useEffect } from 'react';

export const ShoppingCardContext = createContext()

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('account')
  const signOutInLocalStorage = localStorage.getItem('sign-out')
  let parsedAccount
  let parsedSignOut

  if (!accountInLocalStorage ) {
    localStorage.setItem('account', JSON.stringify({}))
    parsedAccount = {}
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage)
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(false))
  }else {
    parsedSignOut = JSON.parse(signOutInLocalStorage)
  }
}

export const ShoppingCardProvider = ({children}) => {
  //my account 
    const [account, setAccount] = useState({})

// sin-out
    const [signOut, setSignOut] = useState(false)


// shopping card increment
    const [count, setCount] = useState(0)

    //Open close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)


 //Open close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenupen] = useState(false)
    const openCheckoutSideMenu= () => setIsCheckoutSideMenupen(true)
    const closeCheckoutSideMenu= () => setIsCheckoutSideMenupen(false)

    //productDetail * show product
    const [productToShow, setProductToShow] = useState({})

    //Shopping cart * add products to cart
    const [cartProducts, setCartProducts] = useState([])

    //shoppi cart * order
    const [ order, setOrder] = useState ([])

    //get product
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)
    

    //get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    //get products by category
    const [SearchByCategory, setSearchByCategory] = useState(null)
    
    useEffect(() => {
      fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
      }, [])

      const filteredItemsByTitle = (items, searchByTitle) =>{
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }

      const filteredItemsByCategory = (items, SearchByCategory) =>{
        return items?.filter(item => item.category.name.toLowerCase().includes(SearchByCategory.toLowerCase()))
      }

      const filterBy = (searchType, items, searchByTitle, SearchByCategory) => {
        if (searchType === 'BY__TITLE'){
          return filteredItemsByTitle(items, searchByTitle)
        }

        if (searchType === 'BY__CATEGORY'){
          return filteredItemsByCategory(items, SearchByCategory)
        }

        if (searchType === 'BY__TITLE_AND_CATEGORY'){
          return filteredItemsByCategory(items, SearchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }

        if (!searchType){
          return items
        }
      }



      useEffect(() => {
        if (searchByTitle && SearchByCategory) setFilteredItems(filterBy('BY__TITLE_AND_CATEGORY',  items, searchByTitle, SearchByCategory))
        if (searchByTitle && !SearchByCategory) setFilteredItems(filterBy('BY__TITLE',  items, searchByTitle, SearchByCategory))
        if (!searchByTitle && SearchByCategory) setFilteredItems(filterBy('BY__CATEGORY',  items, searchByTitle, SearchByCategory))
        if (!searchByTitle && !SearchByCategory) setFilteredItems(filterBy(null,  items, searchByTitle, SearchByCategory))
      }, [items, searchByTitle, SearchByCategory])
    
    return (
        <ShoppingCardContext.Provider value={{
            count, 
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu, 
            order,
            setOrder,
            items,
            setItems, 
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            SearchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
            
        }}>
            {children}            
        </ShoppingCardContext.Provider>
    )
}
