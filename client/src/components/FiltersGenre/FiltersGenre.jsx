import {filterByGenre} from "../../actions";
import {useDispatch , useSelector} from "react-redux";
import React from "react";
import { getGenres } from "../../actions";
import { useEffect } from "react";



export default function FiltersGenre(){

const dispatch=useDispatch()
const genres = useSelector(state => state.genres)


useEffect(() => {
  dispatch(getGenres())
}, [dispatch])


 function handleFilterGenre(e){
  dispatch(filterByGenre(e.target.value))
}




return(
<>
<div >
            <select onChange={(e) => handleFilterGenre(e)}>
                <option value="Todos">TODOS LOS GENEROS</option>
                {
                    genres && genres.map(e => (
                        <option key={e.name} value={e.name}> {e.name} </option>

                    ))
                }
            </select>
        </div>
               
               </>
 )
}