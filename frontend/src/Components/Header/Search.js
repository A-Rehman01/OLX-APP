import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import style from './Header.module.css'
import SearchIcon from '@material-ui/icons/Search';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { PopularLoacation } from './PopularLoacation';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

const CurrentLocation = () => {
    return (
        <div className={style.mylocation}>
            <MyLocationIcon style={{ color: 'blue' }} />
            <p>
                <span style={{ fontWeight: 'bold' }}> Use current location </span> <br />
            Location blocked Check browser/phone settings.
            </p>
        </div>
    )
}

const RecentLocation = ({setareaName,setdisplay}) => {
    return (
        <div className={style.RecentlocContainer}>
            <div className={style.recentlocationheading}>Recent Loacation</div>
            <ul>
                <li onClick={()=>{
                                setareaName('Punjab')
                                setdisplay(false)
                            }}>
                    <div className={style.Recentlocation}>
                        <span> <LocationOnOutlinedIcon /> </span>
                        <p> Punjab </p>
                     </div>   
                </li>
            </ul>
        </div>
    )
}

export const Search = ({display, setdisplay}) => {
    const [areaName,setareaName] = useState('Pakistan');

    const showData = () => {
                setdisplay(true)
            }
    const hideData = () => {
                setdisplay(false)
            }

    return (
            <div>
                <div className={display ? style.Searchfocus : style.Search1}>
                    <SearchIcon className={display ? style.searchiconfocus : style.searchicon} />
                    <input type='text' value={areaName} readOnly placeholder='Search city, area or local' />
                    <div>
                        {
                            display ?
                                <p onClick={hideData}>
                                    <ExpandMoreIcon className={style.arrowup} />
                                </p>
                                :
                                <p onClick={showData}>
                                    <ExpandLessIcon className={style.arrowdown} />
                                </p>
                        }

                    </div>
                </div>
                {display &&
                    <div className={style.dropdown}>
                        <ul>
                            <li className={style.li}>
                                <CurrentLocation />
                            </li>
                            <li><hr /></li>
                            <li><RecentLocation setdisplay={setdisplay} setareaName={setareaName}/></li>
                            <li><hr /></li>
                            <li className={style.li}><PopularLoacation setdisplay={setdisplay} setareaName={setareaName} /></li>
                        </ul>
                        <p>

                        </p>
                    </div>
                }
            </div>
    )
}
