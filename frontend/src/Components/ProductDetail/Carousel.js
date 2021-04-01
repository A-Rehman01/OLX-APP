import React,{useEffect} from 'react';
import {responsive} from './Responsive'
import style from '../CardsCarousel/carousel.module.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Cards from '../CardsCarousel/Cards'
import {useDispatch,useSelector} from  'react-redux';
import {SimilarProduct,similarpro} from '../../Reducer/ProductSlice'


export function CardsCarousel({productCategory,productid}) {
    const dispatch=useDispatch();
    const data = useSelector(similarpro)

    console.log("data===>",productCategory,productid)

    useEffect(()=>{
        async function getData() {
            dispatch(SimilarProduct({productCategory,productid}))
        }
        getData();
    },[productid,dispatch,productCategory])


    console.log("data",data)

    if (!data.loading) {
        return (
                null
            )
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
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    
                    {
                        data?.product.map((obj) => {
                            return (
                                <Cards
                                    key={obj.id}
                                    obj={obj}
                                />
                            )
                        })
                    }

                </Carousel>
       
        </div>
    )

}