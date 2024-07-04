import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { useEffect } from "react"
import { fetchItem, fetchProducts, resetProduct } from "../features/productSlice"

function ProductList() {
    const {products, status} = useSelector((state: RootState) => state.productR)
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

  return (
    <div className="container">
        <h2>Product List</h2>
        {status === 'loading' && <p id="loading">Loading...</p>}

        {!product&&products.length>0 && <ul className="products">
            {products.map(product => {
              const { id, title, description, price, thumbnail } = product;
              return (
                <li key={id}>
                    <img src={thumbnail} alt={title} />
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <p>${price}</p>
                    <button onClick={() => handleGetItem(id)}>Show More</button>
                </li>
              );
            })} 
        </ul>}
        
        {product && (
          <div className="product">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleBackBtn()}>Back to Product List</button>
            </div>
        )}
    </div>
  )
}

export default ProductList
