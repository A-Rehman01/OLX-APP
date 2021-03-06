import React, { useEffect } from 'react';
import ProductSellForm from '../Components/sellproduct';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userData } from '../Reducer/UserSlice';

const Sell = () => {
  const data = useSelector(userData);
  const { user } = data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>{user ? <ProductSellForm /> : <Navigate to='/login' />}</div>;
};

export default Sell;
