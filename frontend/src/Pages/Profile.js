import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userData } from '../Reducer/UserSlice';
import MyProduct from '../Components/products';

const Profile = () => {
  const data = useSelector(userData);
  const { user } = data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>{user ? <MyProduct /> : <Navigate to='/login' />}</div>;
};

export default Profile;
