import React from 'react';
import style from './carousel.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from 'react-router-dom';

let LessDetail = (data) => {
  var returndata = '';
  if (data) {
    for (var i = 0; i <= 40; i++) {
      if (data.length === i) {
        return returndata;
      }
      returndata = returndata + data[i];
    }
    returndata = returndata + '...';
    return returndata;
  } else {
    return '';
  }
};

export default function Cards({ obj }) {
  console.log(obj);

  return (
    <>
      <Link to={`/product/${obj.id}`}>
        <div className={style.card}>
          <div className={style.Uppercard}>
            {obj.featured ? <p className={style.Featured}>Featured</p> : null}
            <div style={{ height: '155px', margin: '0 auto' }}>
              <img
                src={obj.images.imgfrontside}
                alt='ProductImg'
                className={
                  obj.featured
                    ? `${style.Productimg}`
                    : `${style.Productimgold}`
                }
              />
            </div>
            <FavoriteBorderIcon style={{ color: 'black' }} />
          </div>
          <div className={style.BottomCard}>
            <div className={style.ProductDetail}>
              <div className={style.productPrice}>Rs {obj.productPrice}</div>
              <div className={style.productName}>
                {LessDetail(obj.productName)}
              </div>
            </div>

            <div className={style.addressData}>
              <div
                className={style.AddressCity}
              >{`${obj.area},${obj.city}`}</div>
              <div className={style.Date}>{obj.date}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
