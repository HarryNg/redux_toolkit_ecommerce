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
    </div>
  )
}

export default ProductList
