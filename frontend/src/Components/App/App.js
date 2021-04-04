import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Reducer/ProductSlice';
import { createProductdata } from '../../Reducer/ProductSlice';

import './App.css';

//Components
import { Header } from '../Header/Header';
import Footer from '../Footer';

//Pages
import Home from '../../Pages/Home';
import Product from '../../Pages/Product';
import SignIn from '../../Pages/SignIn';
import SignUp from '../../Pages/SignUp';
import Sell from '../../Pages/Sell';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(createProductdata);
  const { success } = data;

  useEffect(() => {
    async function getData() {
      // dispatch(AddItems());
      dispatch(getProducts());
    }
    getData();
  }, [dispatch, success]);

  return (
    <div className='AppContainer'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/product/:productid' element={<Product />} />
        <Route path='/productsell' element={<Sell />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
