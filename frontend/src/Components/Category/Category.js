import React, { useState } from 'react';
import style from './Category.module.css'
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Link } from 'react-router-dom';
import { OutSideClick } from './OutSideClick';
import { Categorylist } from './List'



export function Category() {
    const [display, setDisplay] = useState(false)
    let listofitems = ['Mobiles Phones', 'Cars', 'MotorCycle', 'House', 'TV-Vedio-Audio', 'Tablets', 'Land & Plot']

    let showlist = () => {
        setDisplay(true)
        console.log('true')
    }
    let hidelist = () => {
        setDisplay(false)
        console.log('false')
    }
    return (
        <div className={style.CategoryContainer}>
            <div>
                <Grid
                    container
                    justify="center"
                    spacing={1}
                    alignItems="center"
                >
                    <Grid item xs={12} sm={2}>
                        <div className={style.CategoryHeading}>
                            <p>All Categories</p>
                            {display ?
                                <p onClick={hidelist}>
                                    <ExpandMoreIcon className={style.expandlessicon} />
                                </p>
                                :

                                <p onClick={showlist}>
                                    <ExpandLessIcon className={style.expandmoreicon} />
                                </p>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={8} sm={10}>
                        <div className={style.listofitems}>
                            {
                                listofitems.map((obj, ind) => {
                                    return (
                                        <Link to={`/${obj}`} key={ind} className={style.items}>
                                            {obj}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </Grid>
                </Grid>

                <OutSideClick setDisplay={setDisplay} display={display}>
                    <Categorylist display={display} />
                </OutSideClick>
            </div>

        </div>
    )
}
