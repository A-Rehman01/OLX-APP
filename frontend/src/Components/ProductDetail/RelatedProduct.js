import React from 'react';
import style from './ProductDetail.module.css';
import Grid from '@material-ui/core/Grid';
import { CardsCarousel } from './Carousel';

export const RelatedProduct = ({ productCategory, productid }) => {
  console.log({ productid });
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={8} className={style.RelatedProduct}>
          <CardsCarousel
            productCategory={productCategory}
            productid={productid}
          />
        </Grid>
      </Grid>
    </div>
  );
};
