import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { useEffect } from "react"
import { fetchItem, fetchProducts, resetProduct } from "../features/productSlice"
import ProductItem from "./ProductItem"
import ProductListItems from "./ProductListItems"

function ProductList() {
    const {products, status, error} = useSelector((state: RootState) => state.productR)
    let {product} = useSelector((state: RootState) => state.productR)

    const dispatch:AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleGetItem = (id: string) => {
      dispatch(fetchItem(id));
    }
    const handleBackBtn = () => {
      dispatch(resetProduct());
    }

    if (status === 'loading') {
      return <p id="loading">Loading...</p>
    }
    
    if(status === 'failed' && !products.length) {
      return <p id="failed">Failed to fetch products</p>
    }

    if (error) {
      return <div>Error: {error.toString()}</div>;
    }

  return (
    <div className="container">
        <h2>Product List</h2>

        {!product && products.length>0 && 
          <ul className="products">
            {products.map(product => (
                <ProductListItems 
                  product={product} 
                  onHandleGetItem={handleGetItem} 
                  key={product.id}
                />
              )
            )}
          </ul>
        }

        < ProductItem product={product} onHandleBackBtn={handleBackBtn}/>
        
    </div>
  )
}

export default ProductList
