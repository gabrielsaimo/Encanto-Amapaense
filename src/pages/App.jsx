import "../css/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Affix, FloatButton } from "antd";
import React from "react";
import CollapseMenu from "./modules/Collapse";
import Menu from "./modules/BottonMenu";
import CardSlide from "./modules/CardSlide";
function App() {
  return (
    <div>
      <div className="App background_fundo">
        <img
          className="fundo"
          src={require("../assets/fundo.png")}
          alt="fundo"
          loading="lazy"
        />
        <img
          className="logo"
          src={require("../assets/logo.png")}
          alt="logo-principal"
          loading="lazy"
        />
        <Affix offsetTop={10} style={{ marginLeft: "80%" }}>
          <Menu />
        </Affix>
        <CardSlide />
        <CollapseMenu />
        <FloatButton.BackTop />
        <div style={{ height: 30 }} />
      </div>
    </div>
  );
}

export default App;
