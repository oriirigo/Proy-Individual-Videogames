import React from "react";
import Styles from './Paginated.module.css'
 
export default function Paginated({videogamesperPage, allVideoGames, actualPage}){
    const pageNumber=[];
    const maxPage=Math.floor(allVideoGames/videogamesperPage)

    for(let i =0; i<=maxPage; i++){
        pageNumber.push(i+1)
    }
 
    return(
        <div>
            <div className={Styles.paginado}>
                {pageNumber &&
                    pageNumber.map(num=>(
                               
                            <div key={num} className={Styles.number} onClick={()=>actualPage(num)}>{num}</div>  
                                     
                    ))}
            </div>
        </div>
    )
 
}
