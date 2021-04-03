import React from 'react';
import SiginInForm from '../Components/SignIn';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userData } from '../Reducer/UserSlice';

const SignIn = () => {
  const data = useSelector(userData);
  const { user } = data;
  return <div>{user ? <Navigate to='/' /> : <SiginInForm />}</div>;
};

export default SignIn;
