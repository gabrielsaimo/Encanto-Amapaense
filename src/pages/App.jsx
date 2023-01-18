import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Entradas,
  mujicas_caldos,
  peixe_ao_molho,
  peixe_frito,
  peixe_na_chapa,
  camarao,
  carnes,
  frango,
  moquecas,
  caldeiradas,
  Porcoes_extras,
  Sobremesas,
  Bebidas,
} from "../json/data";
import { Affix, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import CollapseMenu from "./modules/Collapse";
import Menu from "./modules/BottonMenu";
function App() {
  return (
    <div
      className="App"
      style={{
        background:
          " linear-gradient(90deg, rgba(178,125,64,1) 0%, rgba(251,247,244,1) 100%)",
        width: "100%",
        maxWidth: 768,
        height: "100%",
        backgroundSize: "cover",
        justifyContent: "center",
        marginBottom: -50,
        userSelect: "none",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <img
        src={require("../assets/logo.png")}
        alt="logo-principal"
        style={{
          width: "95%",
          marginTop: 20,
        }}
        loading="lazy"
      />
      <Affix offsetTop={10} style={{ marginLeft: "80%" }}>
        <Menu />
      </Affix>

      <CollapseMenu />

      <div style={{ height: 30 }}></div>
    </div>
  );
}

export default App;
