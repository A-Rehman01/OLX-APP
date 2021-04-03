import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Data from '../DummyData.json';
import axios from 'axios';

export const getProducts = createAsyncThunk('getProductsFromAPI', async () => {
  try {
    const { data } = await axios.get('/api/products');
    // console.log('Products list=> ', data);
    return await data;
  } catch (err) {
    console.log(err.response);
  }
});

export const getProductsByID = createAsyncThunk(
  'getProductsbyIDFromAPI',
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      console.log('Products Details=> ', data);
      return await data;
    } catch (err) {
      console.log(err.response);
    }
  }
);

export const ProductSlice = createSlice({
  name: 'productlist',
  initialState: {
    isloading: false,
    detail: [],
    detailLoading: false,
    Rproduct: [],
    RproductLoading: false,
    Products: [],
    ProduuctByID: [],
  },

  reducers: {},

  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      // console.log('fullfild');
      // console.log(action.payload);
      state.Products = action.payload;
      state.isloading = false;
    },
    [getProducts.reject]: (state, action) => {
      //   console.log('API rejected');
      console.log(action.payload);
      state.isloading = false;
    },
    [getProducts.pending]: (state, action) => {
      //   console.log('pending');
      state.isloading = true;
    },
    [getProductsByID.fulfilled]: (state, action) => {
      // console.log('fullfild');
      state.detail = action.payload;
      state.detailLoading = false;
    },
    [getProductsByID.reject]: (state, action) => {
      // console.log('API rejected');
      state.detailLoading = false;
    },
    [getProductsByID.pending]: (state, action) => {
      // console.log('pending');
      state.detailLoading = true;
    },
  },
});

export const {} = ProductSlice.actions;

export const productdata = (state) => {
  return {
    productlist: state.productlist.Products,
    loading: state.productlist.isloading,
  };
};

export const detailpro = (state) => {
  return {
    detail: state.productlist.detail,
    loading: state.productlist.detailLoading,
  };
};

export default ProductSlice.reducer;
