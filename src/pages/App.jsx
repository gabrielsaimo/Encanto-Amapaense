import "../css/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Affix, Button, FloatButton } from "antd";
import React from "react";
import CollapseMenu from "./modules/Collapse";
import Menu from "./modules/BottonMenu";
import Msn from "./modules/Msn";
import { Link } from "react-router-dom";
function App() {
  const [visible2, setVisible2] = React.useState(false);
  const [contar, setContar] = React.useState(0);

  React.useEffect(() => {
    if (contar > 20 && contar < 30) {
      setVisible2(true);
    }
  }, [contar]);

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
          onClick={() => {
            setContar(contar + 1);
          }}
        />
        <Affix offsetTop={10} style={{ marginLeft: "80%" }}>
          <Menu />
        </Affix>
        {visible2 ? (
          <Button>
            <Link to="/Dashboard"> 👀👀👀👀 </Link>
          </Button>
        ) : null}
        <CollapseMenu />
        <FloatButton.BackTop />
        <Msn />
        <div style={{ height: 30 }} />
      </div>
    </div>
  );
}

export default App;
