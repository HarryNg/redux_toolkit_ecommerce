import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { useEffect, useState } from "react"
import { fetchItem, fetchProducts, resetProduct } from "../features/productSlice"
import ProductItem from "./ProductItem"
import ProductListItems from "./ProductListItems"

function ProductList() {
    const {products, status, error} = useSelector((state: RootState) => state.productR)
    let {product} = useSelector((state: RootState) => state.productR)
    const dispatch:AppDispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [sortOption, setSortOption] = useState<string>('price-asc')
    const [currentPage, setCurrentPage] = useState<number>(1)

    //`https://dummyjson.com/products?limit=${itemPerPage}&skip=${(currentPage-1)*itemPerPage}`
    const itemPerPage = 10
    const url = `https://dummyjson.com/products?limit=0`
    

    useEffect(() => {
      dispatch(fetchProducts(url));
    }, [dispatch]);
  
    const handleGetItem = (id: string) => {
      dispatch(fetchItem(id));
    }

    const handleBackBtn = () => {
      dispatch(resetProduct());
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value)
    }

    useEffect( () => {
      setCurrentPage(1)
    }, [searchTerm, sortOption])

    const filteredProducts = products
      .filter(product => product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOption === 'price-asc') {
          return a.price - b.price
        }
        else if (sortOption === 'price-desc') {
          return b.price - a.price
        }
        else if (sortOption === 'rating-asc') {
          return a.rating - b.rating
        }
        else if (sortOption === 'rating-desc') {
          return b.rating - a.rating
        }
        return 0
      })

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage);
    const totalPages = Math.ceil(filteredProducts.length / itemPerPage);
    if (status === 'loading') {
      return <p id="loading">Loading...</p>
    }
    
    if(status === 'failed' && !products.length) {
      return <p id="failed">Failed to fetch products</p>
    }

    if (error) {
      return <div>Error: {error.toString()}</div>;
    }

    const handleCurrentPageChange = (index:number) =>{
      setCurrentPage(index)
    }
    
  return (
    <div className="container">
        <h2>Product List</h2>

        <input 
          type="text" 
          placeholder="Search product" 
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <select 
          value={sortOption} 
          onChange={handleSortChange}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>

        {!product && paginatedProducts.length>0 && 
          <ul className="products">
            {paginatedProducts.map(product => (
                <ProductListItems 
                  product={product} 
                  onHandleGetItem={handleGetItem} 
                  key={product.id}
                />
              )
            )}
          </ul>
        }
        {!product && (<div className="pagination">
          {Array.from({length: totalPages}, (_, index)=> {
            return <button 
              key={index}
              className={currentPage === index+1 ? 'active' : ''}
              onClick={ () => handleCurrentPageChange(index+1)}>
                {index + 1}
              </button>
          })}
        </div>)}

        < ProductItem product={product} onHandleBackBtn={handleBackBtn}/>
        
    </div>
  )
}

export default ProductList
