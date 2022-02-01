import React from "react";
import { Link } from "react-router-dom";
import Styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={Styles.mainDiv}>
      <div className={Styles.secondDiv}>
        <h1 className={Styles.h1}>Welcome to VIDEOGAMES Henry! </h1>
        <span className={Styles.span}>
          Developer: Oriana Irigo
        </span>
        <span className={Styles.span}>
          Purpose:Individual  Project in Bootcamp SoyHenry
        </span>
        <span className={Styles.span}>
          Programming Language: JavaScript
        </span>
        <span className={Styles.span}>
          Techs: React - Redux - NodeJs - CSS - PostgreSQL - Sequelize - Express{" "}
        </span>
        <Link to="/home">
          <button className={Styles.btn}>START</button>
        </Link>
      </div>
    </div>
  );
}
