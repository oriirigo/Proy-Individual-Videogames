import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGames } from "../../actions";
import Styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    dispatch(getNameVideoGames(name))
      .then((response) => {
        !response ? setError(true) : setError(false);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <p className={Styles.divErrors}>
        {error && <div className={Styles.error}>Game not found</div>}
        {loading && loading ? (
          <div className={Styles.search}>Searching...</div>
        ) : null}
      </p>
      <div className={Styles.search}>
        <div className={Styles.divSearch}>
          <input
            className={Styles.input}
            type="text"
            placeholder="Search videogames"
            onChange={(e) => handleChange(e)}
            value={name}
          />
          <button
            className={Styles.button}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
