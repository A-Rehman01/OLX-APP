import React from 'react';
import style from './carousel.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';
import { productdata } from '../../Reducer/ProductSlice';
import Cards from './Cards';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
export function CardsCarousel() {
  const { productlist, loading } = useSelector(productdata);
  // console.log(productlist);

  if (loading) {
    return null;
  }

  return (
    <div className={style.CardsCarousel}>
      <div className={style.Moreonlaptop}>More on laptop</div>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        // customTransition='all 0.5'
        transitionDuration={500}
        containerClass='carousel-container'
        dotListClass='custom-dot-list-style'
        itemClass='carousel-item-padding-40-px'
        // slidesToSlide={2}
      >
        {productlist &&
          productlist
            .slice(0)
            .reverse()
            .slice(0, 8)
            .map((obj) => {
              return <Cards key={obj._id} obj={obj} />;
            })}
      </Carousel>
    </div>
  );
}
