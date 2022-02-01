import React from "react";
import { filterBySource } from "../../actions";
import { useDispatch } from "react-redux";
import Styles from './FiltersSource.module.css'

export default function FiltersSource(){
    const dispatch=useDispatch()

    function handleFilterSource(e){
        dispatch(filterBySource(e.target.value))
      
      }

    return(
        <>
        <div className={Styles.flexDistance}>
         <div className={Styles.cajaSource}>
        <select className={Styles.selectSource} onChange={e=>handleFilterSource(e)} >
            <option value='All'>All videogames</option>
            <option value='created'>Created videogames</option>
            <option value='api'>Existing videogames</option>
        </select>
        </div>
    </div>
        </>
    )
}