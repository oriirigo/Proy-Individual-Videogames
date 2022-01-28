import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideoGames } from "../../actions";
import VideoGameCard from "../VideoGameCard/VideoGameCard";
import FiltersGenre from "../FiltersGenre/FiltersGenre";
import FiltersSource from "../FiltersSource/FiltersSource";
import Orderby from "../OrderBy/OrderBy";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import { Fragment } from "react";

export default function HomePage() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getVideoGames())
  }, [dispatch]);

  const [currentePage, setCurrentePage] = useState(1);
  const [videogamesperPage] = useState(15);
  const indexOfLastVG = currentePage * videogamesperPage;
  const indexOfFirstVG = indexOfLastVG - videogamesperPage;
  const currentCards = allVideoGames?.slice(indexOfFirstVG, indexOfLastVG); //uso los indices para "fraccionar que juegos muestro"

  const actualPage = (numpag) => {
    setCurrentePage(numpag);
  };

  function handleShowAll(e) {
    e.preventDefault();
    dispatch(getVideoGames());
  }

  return (
    <>
      <div>
        <div>
          <h1>Videogames Henry</h1>
        </div>
        <div>
          <Link to="/videogame">
            <button>Crea un nuevo videojuego</button>
          </Link> 
        </div>
        <div>
          <button onClick={handleShowAll}>Cargar todos los videojuegos</button>
        </div>
         <div>
          <FiltersGenre />
        </div>
        <div>
          <FiltersSource />
        </div>
        <div>
          <Orderby />
        </div> 
        <div>
          <Paginated
            videogamesperPage={videogamesperPage}
            allVideoGames={allVideoGames?.length}
            actualPage={actualPage}
          />
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <div>
            {currentCards &&
              currentCards.map((games) => {
                return (
                  <Fragment  key={games.id} >
                      <VideoGameCard
                        name={games.name}
                        image={games.image}
                        genres={games.genres?.map((e) => e.name)}
                        rating={games.rating}
                        id={games.id}
                        createdDb={games.createdDb}
                      
                      />
                   </Fragment> 
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
