import React from 'react';
import SignUpForm from '../Components/SignUp';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userData } from '../Reducer/UserSlice';

const SignUp = () => {
  const data = useSelector(userData);
  const { user } = data;
  return <div>{user ? <Navigate to='/' /> : <SignUpForm />}</div>;
};

export default SignUp;
