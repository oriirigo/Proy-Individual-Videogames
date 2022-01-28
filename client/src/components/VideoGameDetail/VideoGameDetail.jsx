import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";

export default function VideoGameDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(details[0]?.description, "text/html");
  const description = htmlDoc.body.innerText;

  return (
    <div>
      {details.length > 0 ? (
        <div>
          <h1> {details[0]?.name} </h1>
          <img src={details[0]?.image} alt="" width="500px" height="300px" />
          <p>{description}</p>
          <h2>Release Date:</h2>
          <p> {details[0]?.released} </p>
          <h2>Rating:</h2>
          <p>{details[0]?.rating} </p>
          <h2>Platforms:</h2>
          <p> {details[0].platforms?.map((e) => e.name + " / ")} </p>
          <h2>Genres:</h2>
          <p> {details[0].genres?.map((e) => e.name + " / ")} </p>
        </div>
      ) : (
        <p>Loading..</p>
      )}
      <Link to="/home">Volver</Link>
    </div>
  );
}
