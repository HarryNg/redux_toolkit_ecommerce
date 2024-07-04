import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Product, ProductState } from "../type"



const url = 'https://dummyjson.com/products'
const initialState : ProductState = {
    products: [],
    product: null,
    totalItems: 0,
    status: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (url:string) => {
    const response = await axios.get(url)
    
    return response.data.products
})
export const fetchItem = createAsyncThunk('products/fetchItem', async (id: string) => { 
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        return response.data
    } catch (error) {
        return error
    }
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