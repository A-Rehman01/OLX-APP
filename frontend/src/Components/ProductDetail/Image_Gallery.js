import React from 'react';
import ImageGallery from 'react-image-gallery';
import style from './ProductDetail.module.css';


const getimages=(img)=>{
   let sendimages= Object.keys(img).map((obj)=>{
        const original = img[obj];
        const thumbnail = img[obj];
        return {original,thumbnail}
        
    })
    // console.log(sendimages)
    return sendimages;
}

export  function ImgGallery({image}) {
    // console.log('images==>',image)
    return (

        <div className={style.ImageGallery}>
            <ImageGallery
            showIndex={true}  
            showPlayButton={false} 
            showFullscreenButton={true}
            items={getimages(image)} />
        </div>

    )

}