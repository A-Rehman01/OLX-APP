import React from 'react'
import style from './Header.module.css'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

export const PopularLoacation = ({setareaName,setdisplay}) => {
    let location = ['Punjab','Islamabad Capitol Territory','Sindh','Khyber Pakhtunkhwa']
    return (
        <div className={style.poplocContainer}>
            <div className={style.poplocationheading}>Popular Loacation</div>
            <ul>
                {
                    location.map((obj,ind)=>{
                        return(
                            <li key={ind} onClick={()=>{
                                setareaName(obj)
                                setdisplay(false)
                            }}>
                               <div className={style.poplocation}> 
                                <span> <LocationOnOutlinedIcon/> </span>  
                                <p>{obj} </p>
                               </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
