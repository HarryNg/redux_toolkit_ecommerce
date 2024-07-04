import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export type Product ={
    id: string
    title: string
    description: string
    price: number
    category: string
    thumbnail: string
}

const initialState : ProductState = {
    products: [],
    product: null,
    status: 'idle',
    error: null
}
export type ProductState = {
    products: Product[]
    product: Product | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null | {}
}
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://dummyjson.com/products')
    return response.data.products
})
export const fetchItem = createAsyncThunk('products/fetchItem', async (id: string) => { 
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    return response.data
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProduct: (state) => {
            state.product = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.status = 'succeeded'
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action: PayloadAction<unknown | string>) => {
            state.status = 'failed'
            state.error = action.payload || "Failed to fetch products"
        })
        builder.addCase(fetchItem.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchItem.fulfilled, (state, action: PayloadAction<Product>) => {
            state.status = 'succeeded'
            state.product = action.payload
        })
        builder.addCase(fetchItem.rejected, (state, action: PayloadAction<unknown | string>) => {
            state.status = 'failed'
            state.error = action.payload || "Failed to fetch product"
        })

    }
})
export const { resetProduct } = productSlice.actions
export default productSlice.reducer