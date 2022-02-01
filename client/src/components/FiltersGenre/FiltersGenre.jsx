import { filterByGenre } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getGenres } from "../../actions";
import { useEffect } from "react";
import Styles from './FiltersGenre.module.css'

export default function FiltersGenre() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  function handleFilterGenre(e) {
    dispatch(filterByGenre(e.target.value));
  }

  return (
    <>
      <div className={Styles.flexDistance}>
        <div className={Styles.cajaGenre}>
          <select className={Styles.selectGenre} onChange={(e) => handleFilterGenre(e)}>
            <option value="Todos">All genres</option>
            {genres &&
              genres.map((e) => (
                <option key={e.name} value={e.name}>
                  {" "}
                  {e.name}{" "}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
}
