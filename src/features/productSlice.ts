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
    status: 'idle',
    error: null
}
export type ProductState = {
    products: Product[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null | {}
}
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://dummyjson.com/products')
    return response.data.products
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
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
    }
})
export default productSlice.reducer