import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Product, ProductState } from "../type"

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
        },
        fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            state.status = 'succeeded';
        },
        fetchItemSuccess(state, action: PayloadAction<Product>) {
            state.product = action.payload;
            state.status = 'succeeded';
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
        },
        editProduct(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
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
export const { addProduct, editProduct, deleteProduct, resetProduct, fetchProductsSuccess, fetchItemSuccess } = productSlice.actions;
export default productSlice.reducer