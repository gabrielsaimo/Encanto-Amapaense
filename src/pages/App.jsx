import "../css/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Affix } from "antd";
import React from "react";
import CollapseMenu from "./modules/Collapse";
import Menu from "./modules/BottonMenu";
function App() {
  return (
    <div className="App background_fundo">
      <img
        className="logo"
        src={require("../assets/logo.png")}
        alt="logo-principal"
        loading="lazy"
      />
      <Affix offsetTop={10} style={{ marginLeft: "80%" }}>
        <Menu />
      </Affix>
      <CollapseMenu />
      <div style={{ height: 30 }} />
    </div>
  );
}

export default App;
