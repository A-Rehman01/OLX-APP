import React from 'react';
import style from './Category.module.css'
import { Link } from 'react-router-dom';
import { TopCategory } from './Constraint';
import Grid from '@material-ui/core/Grid';


const List = ({ obj }) => {
    return (
        <div>

            <ul>
                <h4 className={style.dropdownheading}>{obj.title}</h4>
                {
                    obj.links.map((items, ind) => {
                        return (
                            <li key={ind}>
                                <Link className={style.dropdownitems} to={`/${items}`}>
                                    {
                                        items
                                    }
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export const Categorylist = ({ display }) => {
    return (

        <Grid
            container
            justify="center"
            spacing={1}
        >
            <Grid item xs={10} sm={10} >
                <div className={display ? `${style.show}` : `${style.hide}`}>
                    <div>
                        {
                            TopCategory.map((obj, ind) => {
                                return <List obj={obj} key={ind} />
                            })
                        }
                    </div>
                </div>
            </Grid>
        </Grid>

    )
}