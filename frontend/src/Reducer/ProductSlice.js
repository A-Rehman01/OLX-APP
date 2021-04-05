import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Data from '../DummyData.json';
import axios from 'axios';

const locationsdata = [
  'Aus',
  'Eng',
  'Ing',
  'Jer',
  'South-Africa',
  'Canada',
  'West',
  'Itay',
  'Dubai',
  'Turkey',
];

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
      // console.log('Products Details=> ', data);
      return await data;
    } catch (err) {
      console.log(err.response);
    }
  }
);

export const getCategory = createAsyncThunk('getCategoryFromAPI', async () => {
  try {
    const { data } = await axios.get('/api/products/category');
    // console.log('Products Category List=> ', data);
    return await data;
  } catch (err) {
    console.log(err.response);
  }
});

export const createProduct = createAsyncThunk(
  'createProductsFromAPI',
  async (ProductData) => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/products/`, ProductData, config);
      // console.log('Product Created=> ', data);
      return await data;
    } catch (err) {
      console.log(err.response);
    }
  }
);

export const getMyProduct = createAsyncThunk(
  'getMyProductFromAPI',
  async () => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/products/myproducts`, config);
      console.log('My Product => ', data);
      return await data;
    } catch (err) {
      console.log(err.response?.data?.message);
      return await err.response?.data?.message;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'deleteProductFromAPI',
  async (id) => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`/api/products/${id}`, config);
      console.log('Products Delete=> ', data);
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
    success: '',
    createLoading: false,
    categories: [],
    categoriesLoading: false,
    FilterProduct: [],
    myProducts: [],
    myProductLoading: false,
    errorInmyProducts: '',
    deleteSucess: false,
    deleteSucessloading: false,
  },

  reducers: {
    filterProductAction: (state, action) => {
      // console.log(state.Products);
      return {
        ...state,
        FilterProduct:
          state.Products &&
          state.Products.filter(
            (data) =>
              data.Category.toLowerCase().indexOf(
                action.payload.toLowerCase()
              ) >= 0
          ),
      };
    },
  },

  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      // console.log('fullfild');
      // console.log(action.payload);
      state.Products = action.payload;
      // state.FilterProduct = action.payload;
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

    [createProduct.fulfilled]: (state, action) => {
      // console.log('fullfild');
      state.success = action.payload?.message;
      state.createLoading = false;
    },
    [createProduct.reject]: (state, action) => {
      // console.log('API rejected');
      state.createLoading = false;
    },
    [createProduct.pending]: (state, action) => {
      // console.log('pending');
      state.createLoading = true;
    },

    [getCategory.fulfilled]: (state, action) => {
      // console.log('fullfild');
      state.categories = action.payload;
      state.categoriesLoading = false;
    },
    [getCategory.reject]: (state, action) => {
      // console.log('API rejected');
      state.categoriesLoading = false;
    },
    [getCategory.pending]: (state, action) => {
      // console.log('pending');
      state.categoriesLoading = true;
    },

    [getMyProduct.fulfilled]: (state, action) => {
      console.log('fullfiled');
      if (action.payload === 'Not any Product at Yet') {
        state.errorInmyProducts = action.payload;
        state.myProducts = [];
      } else {
        state.errorInmyProducts = '';
        state.myProducts = action.payload;
      }
      state.myProductLoading = false;
    },
    [getMyProduct.reject]: (state, action) => {
      state.myProductLoading = false;
      // console.log(action.payload);
      state.errorInmyProducts = action.payload;
    },
    [getMyProduct.pending]: (state, action) => {
      state.myProductLoading = true;
    },

    [deleteProduct.fulfilled]: (state, action) => {
      state.deleteSucess = true;
      state.deleteSucessloading = false;
    },
    [deleteProduct.reject]: (state, action) => {
      state.deleteSucessloading = false;
    },
    [deleteProduct.pending]: (state, action) => {
      state.deleteSucessloading = true;
    },
  },
});

export const { filterProductAction } = ProductSlice.actions;

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

export const createProductdata = (state) => {
  return {
    success: state.productlist.success,
    loading: state.productlist.createLoading,
  };
};

export const getCategoryList = (state) => {
  return {
    list: state.productlist.categories,
    loading: state.productlist.categoriesLoading,
  };
};

export const getProductbyFilter = (state) => {
  return {
    filterProduct: state.productlist.FilterProduct,
  };
};

export const getMyProductsList = (state) => {
  return {
    list: state.productlist.myProducts,
    loading: state.productlist.myProductLoading,
    error: state.productlist.errorInmyProducts,
  };
};

export const ProductDelete = (state) => {
  return {
    loading: state.productlist.deleteSucessloading,
    success: state.productlist.deleteSucess,
  };
};

export default ProductSlice.reducer;
