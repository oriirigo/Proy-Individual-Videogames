import React from "react";
import { Link } from "react-router-dom";
 
export default function VideoGameCard({name, image, genres,rating, id, createdDb}){
    
return(
    <>
    <div>
        <div>
            <Link to={`/detail/${id}`}>
            <h4>{name}</h4>
            </Link  >
            <p>{genres?.map(e => e + "/")}</p>
            <img src={image} alt='Imagen not found' width="350" height="200"  />
            <p >{rating}</p>
        </div>
    </div>
    </>
)
}
