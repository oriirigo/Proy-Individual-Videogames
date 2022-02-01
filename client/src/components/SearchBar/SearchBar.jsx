import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGames } from "../../actions";
import Styles from './SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameVideoGames(name));
  }

  return (
    <>
      <div className={Styles.search}>
        <div className={Styles.divSearch}>
          <input
           className={Styles.input}
            type="text"
            placeholder="Search videogames"
            onChange={(e) => handleChange(e)}
            value={name}
          />
          <button className={Styles.button} type="submit" onClick={(e) => handleSubmit(e)}>
           Search
          </button>
        </div>
      </div>
    </>
  );
}
