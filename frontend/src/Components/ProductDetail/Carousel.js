import React, { useEffect } from 'react';
import { responsive } from './Responsive';
import style from '../CardsCarousel/carousel.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Cards from '../CardsCarousel/Cards';
import { useSelector } from 'react-redux';
import { productdata } from '../../Reducer/ProductSlice';

export function CardsCarousel({ productCategory, productid }) {
  const data = useSelector(productdata);
  const { productlist, loading } = data;

  const similarProducts = productlist.filter(
    (obj) => obj.Category === productCategory && obj._id !== productid
  );

  //   console.log('productlist', productlist);

  if (loading) {
    return null;
  }

  return (
    <div className={style.CardsCarouselforRelatedProducts}>
      <div className={style.Moreonlaptop}>Related Ads</div>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition='all .5'
        transitionDuration={500}
        containerClass='carousel-container'
        dotListClass='custom-dot-list-style'
        itemClass='carousel-item-padding-40-px'
      >
        {similarProducts?.map((obj) => {
          return <Cards key={obj.id} obj={obj} />;
        })}
      </Carousel>
    </div>
  );
}
