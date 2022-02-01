import React from "react";
import { Link } from "react-router-dom";
import Styles from './VideoGameCard.module.css'
 
export default function VideoGameCard({name, image, genres,rating, id, createdDb}){
    
return(
    <>
    <div className={Styles.ctn}>
        <div className={Styles.h1btn}>
            <Link to={`/detail/${id}`}>
            <h1 className={Styles.h1}>{name}</h1>
            </Link  >
            <p className={Styles.p} >{genres?.map(e => e + "/")}</p>
            <div classNmae={Styles.div}>  
            <img src={image} alt='Imagen not found' width="350" height="200"  />
            <p className={Styles.pgame} >{rating}</p>
            </div>
        </div>
    </div>
    </>
)
}
