import { createSlice } from '@reduxjs/toolkit'
import Data from '../DummyData.json';


export const ProductSlice = createSlice({
    name: 'productlist',
    initialState: {
        items: [],
        isloading: false,
        detail: [],
        detailLoading: false,
        Rproduct: [],
        RproductLoading: false,
    },

    reducers: {
        AddItems: (state, action) => {
            return {
                ...state,
                items: Data,
                isloading: true
            }
        },
        Detail: (state, action) => {
            return {
                ...state,
                detail: Data.find((obj) => (obj.id === action.payload)),
                detailLoading: true
            }
        },
        SimilarProduct: (state, action) => {
            return {
                ...state,
                Rproduct: Data.filter((obj) => (
                    obj.Category === action.payload.productCategory && obj.id !== action.payload.productid
                )),
                RproductLoading: true
            }
        }
    },
})

export const { AddItems, Detail, SimilarProduct } = ProductSlice.actions;

export const productdata = (state) => {
    return ({
        productlist: state.productlist.items,
        loading: state.productlist.isloading
    })
}

export const detailpro = (state) => {
    return ({
        detail: state.productlist.detail,
        loading: state.productlist.detailLoading
    })
}

export const similarpro = (state) => {
    return ({
        product: state.productlist.Rproduct,
        loading: state.productlist.RproductLoading
    })
}

export default ProductSlice.reducer;