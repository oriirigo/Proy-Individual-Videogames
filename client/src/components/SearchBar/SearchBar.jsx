import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {getNameVideoGames} from "../../actions";



export default function SearchBar() {

    const dispatch = useDispatch()
    const [name,setName] = useState('')
    

  function handleChange(e){
      e.preventDefault()
      setName(e.target.value)
  }


  function handleSubmit(e){
      e.preventDefault()
      dispatch(getNameVideoGames(name))
  }

    return (
        <>
        <div>
                <input 
                    type="text" 
                    placeholder="Busca un videojuego"
                    onChange={(e) => handleChange(e)}
                    value={name}
                    />
            <button type="submit" onClick={(e)=>handleSubmit(e)} >BUSCAR</button>
            </div>
            </>
    );
};


