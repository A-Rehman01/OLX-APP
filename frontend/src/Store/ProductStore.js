import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from '../Reducer/ProductSlice';
import UserSlice from '../Reducer/UserSlice';

export const ProductStore = configureStore({
  reducer: {
    productlist: ProductSlice,
    userInfo: UserSlice,
  },
});
