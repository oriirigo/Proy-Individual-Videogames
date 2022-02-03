import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteDetalle } from "../../actions";
import Styles from "./VideoGameDetail.module.css";

export default function VideoGameDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(deleteDetalle());
    dispatch(getDetail(id)).then((response) => {
      setLoading(false);
    });
  }, [dispatch, id]);

  if (loading) {
    return (
      <div>
        <Link to="/home">
          <button className={Styles.btnBack}>Home</button>
        </Link>
        <div className={Styles.loading}></div>
      </div>
    );
  }

  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(details[0]?.description, "text/html");
  const description = htmlDoc.body.innerText;

  return (
    <div className={Styles.background}>
   
        <div className={Styles.containerDetails} > 
        {details.length > 0 ? (
          < >
          <div className={Styles.textContainer}>
            <h1 className={Styles.h1}> {details[0]?.name} </h1>
            {details[0].description ? (
              <p className={Styles.description}>{description}</p>
            ) : (
              <p className={Styles.description}>No description</p>
            )}
            
            <h2 className={Styles.h2}>Release Date:</h2>
            <p className={Styles.p}> {details[0]?.released} </p>
            <h2 className={Styles.h2}>Rating:</h2>
            <p className={Styles.p}>{details[0]?.rating} </p>
            <h2 className={Styles.platforms}>Platforms:</h2>
            <p className={Styles.pPlatforms}>
              {" "}
              {details[0].platforms?.map((e) => e.name + " / ")}{" "}
            </p>
            <h2 className={Styles.genre}>Genres:</h2>
            <p className={Styles.pGenre}>
              {" "}
              {details[0].genres?.map((e) => e.name + " / ")}{" "}
            </p>
            </div>
            <img
              className={Styles.image}
              src={details[0]?.image}
              alt=""
              width="500px"
              height="300px"
            />
          </>
        ) : (
          <p>Loading..</p>
        )}
        </div>
      

      <Link to="/home">
        <button className={Styles.btnclose}>Home</button>
      </Link>
    </div>
  );
}
