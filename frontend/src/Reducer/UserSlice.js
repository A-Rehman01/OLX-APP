import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk('loginfromAPI', async (formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/users/login', formData, config);
    console.log('UserData ==> ', data);
    return await data;
  } catch (err) {
    console.log(err.response?.data);
  }
});

export const userRegister = createAsyncThunk(
  'registerfromAPI',
  async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/api/users', formData, config);
      console.log('UserData ==> ', data);
      return await data;
    } catch (err) {
      console.log(err.response?.data);
    }
  }
);

export const UserSlice = createSlice({
  name: 'userInfo',
  initialState: {
    isLoading: false,
    isUser: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  reducers: {
    LogoutUser: (state, action) => {
      localStorage.clear('userInfo');
      return {
        state: {},
        isUser: null,
      };
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      // console.log('fullfild');
      // console.log(action.payload);
      state.isUser = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      state.isLoading = false;
    },
    [userLogin.reject]: (state, action) => {
      //   console.log('API rejected');
      //   console.log(action.payload);
      state.isLoading = false;
    },
    [userLogin.pending]: (state, action) => {
      //   console.log('pending');
      state.isLoading = true;
    },
    [userRegister.fulfilled]: (state, action) => {
      // console.log('fullfild');
      // console.log(action.payload);
      state.isUser = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      state.isLoading = false;
    },
    [userRegister.reject]: (state, action) => {
      //   console.log('API rejected');
      //   console.log(action.payload);
      state.isLoading = false;
    },
    [userRegister.pending]: (state, action) => {
      //   console.log('pending');
      state.isLoading = true;
    },
  },
});

export const { LogoutUser } = UserSlice.actions;

export const userData = (state) => {
  return {
    user: state.userInfo.isUser,
    loading: state.userInfo.isLoading,
  };
};

export default UserSlice.reducer;
