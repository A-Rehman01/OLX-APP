import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import style from './Header.module.css';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import logo from '../../Assests/logo.svg';
import { Link } from 'react-router-dom';
import { Search } from './Search';
import { OutSideClick } from './OutsideClick';
import { useSelector, useDispatch } from 'react-redux';
import { userData, LogoutUser } from '../../Reducer/UserSlice';
import { Menu, MenuItem } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { filterProductAction, productdata } from '../../Reducer/ProductSlice';

export function Header() {
  const dispatch = useDispatch();
  const data = useSelector(userData);
  const Productdata = useSelector(productdata);

  const { user } = data;

  const [display, setdisplay] = useState(false);
  const [openPopover, setOpenPopover] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenPopover(null);
  };

  const open = Boolean(openPopover);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = () => {
    setAnchorEl(null);
    dispatch(LogoutUser());
  };

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
                onChange={(e) => {
                  const data = e.target.value;
                  dispatch(filterProductAction(data));
                }}
              />
              <SearchIcon className={style.searchicon2} />
            </div>
          </Grid>
          <Grid item xs={6} sm={1}>
            <div className={style.LoginHeading}>
              <p
                className={style.LoginHeadingwrite}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                {' '}
                {user ? user.name : 'Menu'}
              </p>
              <p className={style.LoginHeadingunderline}></p>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ zIndex: 2000 }}
              >
                {!user && (
                  <MenuItem onClick={handleClose}>
                    <Link to='/login'>Login</Link>
                  </MenuItem>
                )}
                <MenuItem onClick={handleClose}>Products</MenuItem>
                {user && <MenuItem onClick={Logout}>Logout</MenuItem>}
              </Menu>
            </div>
          </Grid>
          <Grid item xs={6} sm={2}>
            {user && (
              <Link to='/productsell'>
                <div className={style.LoginSell}>
                  <div>
                    <AddIcon className={style.LoginSellicon} />
                    <p>Sell</p>
                  </div>
                </div>
              </Link>
            )}
            {!user && (
              <>
                <div className={style.LoginSell} onClick={handlePopoverOpen}>
                  <div>
                    <AddIcon className={style.LoginSellicon} />
                    <p>Sell</p>
                  </div>
                </div>
                <Menu
                  id='simple-menu'
                  anchorEl={openPopover}
                  keepMounted
                  open={Boolean(openPopover)}
                  onClose={handlePopoverClose}
                  style={{ zIndex: 2000, top: '7%' }}
                >
                  <MenuItem>FirstLogin</MenuItem>
                </Menu>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
