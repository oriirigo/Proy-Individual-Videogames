import React from "react";
 
export default function Paginated({videogamesperPage, allVideoGames, actualPage}){
    const pageNumber=[];
    const maxPage=Math.floor(allVideoGames/videogamesperPage)

    for(let i =0; i<=maxPage; i++){
        pageNumber.push(i+1)
    }
 
    return(
        <nav>
            <ul>
                {pageNumber &&
                    pageNumber.map(num=>(
                        <li key={num}>        
                            <a key={num} onClick={()=>actualPage(num)}>{num}</a>  
                            </li>          
                    ))}
            </ul>
        </nav>
    )
 
}
