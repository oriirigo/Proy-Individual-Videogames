import React from "react";
import { filterBySource } from "../../actions";
import { useDispatch } from "react-redux";

export default function FiltersSource(){
    const dispatch=useDispatch()

    function handleFilterSource(e){
        dispatch(filterBySource(e.target.value))
      
      }

    return(
        <>
        <div>
        <select onChange={e=>handleFilterSource(e)} >
            <option value='All'>TODOS LOS JUEGOS</option>
            <option value='created'>JUEGOS CREADOS</option>
            <option value='api'>JUEGOS YA EXISTENTES</option>
        </select>
    </div>
        </>
    )
}