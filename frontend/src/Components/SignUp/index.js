import React, { useState } from 'react';
import style from '../SignIn/signin.module.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { userRegister } from '../../Reducer/UserSlice';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    const data = {
      name,
      email,
      password,
    };
    // console.log(data);
    dispatch(userRegister(data));
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={style.siginContainer}>
      <h2 className={style.heading}>Register</h2>
      <br />

      <form onSubmit={SubmitHandler}>
        <TextField
          id='outlined-basic'
          label='Name'
          variant='outlined'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={style.inputField}
        />
        <br />
        <br />
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
        <TextField
          id='outlined-basic'
          label='Confirm-Password'
          variant='outlined'
          required
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={style.inputField}
        />
        <br />
        <br />
        {password !== confirmPassword && password && confirmPassword && (
          <p style={{ color: 'red' }}>Password Does Not Match</p>
        )}
        <br />
        <p>
          If already an Account ?{' '}
          <Link to='/login' style={{ color: 'blue' }}>
            login
          </Link>
        </p>
        <br />
        <Button
          variant='contained'
          color='primary'
          style={{ width: '100%', padding: '10px' }}
          type='submit'
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
