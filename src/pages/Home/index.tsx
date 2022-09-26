import React from "react";
import { Link } from "react-router-dom";
import catalogoIcon from "assets/icons/libroPrecio_tarifario-linea-rojo-relleno.svg";
import simuladorIcon from "assets/icons/simulacion_linea-rojo-relleno.svg";
import libroPrecioIcon from "assets/icons/catalogo_linea-rojo-relleno.png";

import styles from "./index.module.scss";

const HOME_ITEMS = [
  {
    name: "Catálogo",
    path: "",
    svg: catalogoIcon,
  },
  {
    name: "Ver libros",
    path: "librodeprecios",
    svg: libroPrecioIcon,
  },
  {
    name: "Simulador",
    path: "simulador",
    svg: simuladorIcon,
  },
  {
    name: "Asignar libros",
    path: "assign",
    svg: libroPrecioIcon,
  },
];

const HomePage = () => {
  return (
    <div className={styles["home-page-container"]}>
      <div className={styles["cards-wrapper"]}>
        {HOME_ITEMS.map((item, index) => (
          <Link key={item.name + index} className={styles["home-card"]} to={item.path}>
            <img alt={item.name} className={styles["card-img"]} src={item.svg} />
            <p>{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
