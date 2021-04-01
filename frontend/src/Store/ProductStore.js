import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from '../Reducer/ProductSlice'

export const ProductStore = configureStore({
    reducer: {
        productlist: ProductSlice
    }
})