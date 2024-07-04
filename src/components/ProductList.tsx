import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { useEffect } from "react"
import { fetchProducts } from "../features/productSlice"

function ProductList() {
    const {products} = useSelector((state: RootState) => state.productR)
    const dispatch:AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

  return (
    <div>
        <h2>Product List</h2>
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    <img src={product.thumbnail} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ProductList
