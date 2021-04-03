import React, { useState } from 'react';
import style from './signin.module.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userData, userLogin } from '../../Reducer/UserSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const data = useSelector(userData);
  console.log('inState =====>', data);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    // console.log(data);
    dispatch(userLogin(data));

    setEmail('');
    setPassword('');
  };

  return (
    <div className={style.siginContainer}>
      <h2 className={style.heading}>LogIn</h2>
      <br />
      <form onSubmit={SubmitHandler}>
        <TextField
          id='outlined-basic'
          label='Email'
          variant='outlined'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style.inputField}
        />
        <br />
        <br />
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          required
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.inputField}
        />
        <br />
        <br />
        <p>
          If not an Account ?{' '}
          <Link to='/register' style={{ color: 'blue' }}>
            register
          </Link>
        </p>
        <br />
        <Button
          variant='contained'
          color='primary'
          style={{ width: '100%', padding: '10px' }}
          type='submit'
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
