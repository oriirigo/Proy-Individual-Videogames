import React from "react";
import { Link } from "react-router-dom";
import Styles from "./LandingPage.module.css";


export default function LandingPage() {
  return (
    <div className={Styles.mainDiv}>
      <div className={Styles.secondDiv}>
        <h1 className={Styles.h1}>Welcome to VIDEOGAMES Henry! </h1>
        {/* <div className={Styles.precarga} >
          <a href='https://www.pinterest.com.mx'>
          <img src='https://www.pinterest.com.mx/pin/741475526142501079/' alt='' />
</a>
        </div> */}
        <Link to="/home">
          <button className={Styles.btn}>START</button>
        </Link>
      </div>
    </div>
  );
}
