import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import style from './Header.module.css';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import logo from '../../Assests/logo.svg';
import { Link } from 'react-router-dom';
import { Search } from './Search';
import { OutSideClick } from './OutsideClick';

export function Header() {
  const [display, setdisplay] = useState(false);

  return (
    <div className={style.HeaderContainer}>
      <Grid container justify='center' spacing={1} alignItems='center'>
        <Grid
          container
          justify='center'
          // spacing={1}
          item
          xs={6}
          sm={4}
          alignItems='center'
        >
          <Grid item xs={12} sm={3}>
            <div className={style.Heading}>
              <Link to='/'>
                <img src={logo} alt='logo' height='50px' />
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <OutSideClick setDisplay={setdisplay}>
              <Search display={display} setdisplay={setdisplay} />
            </OutSideClick>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={6}
          sm={8}
          justify='center'
          spacing={1}
          alignItems='center'
          className={style.secongrid}
        >
          <Grid item xs={12} sm={9}>
            <div className={style.Search2}>
              <input
                type='text'
                placeholder='Find Cars, Mobile Phones and more...'
              />
              <SearchIcon className={style.searchicon2} />
            </div>
          </Grid>
          <Grid item xs={6} sm={1}>
            <Link to='/login' className={style.LoginHeading}>
              <p className={style.LoginHeadingwrite}> Login </p>
              <p className={style.LoginHeadingunderline}></p>
            </Link>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Link to='/productsell'>
              <div className={style.LoginSell}>
                <div>
                  <AddIcon className={style.LoginSellicon} />
                  <p>Sell</p>
                </div>
              </div>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
