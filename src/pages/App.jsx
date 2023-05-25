import "../css/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Affix, Button, FloatButton } from "antd";
import React from "react";
import CollapseMenu from "./modules/Collapse";
import Menu from "./modules/BottonMenu";
import Msn from "./modules/Msn";
import { Link } from "react-router-dom";
import Footer from "./modules/footer";
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
        <LazyLoadImage
          src={require("../assets/fundo.png")}
          className="fundo"
          alt="fundo"
          decoding="async"
          loading="eager"
        />
        <LazyLoadImage
          src={require("../assets/logo.png")}
          className="logo"
          alt="logo-principal"
          loading="eager"
          decoding="async"
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
        <Footer />
        <div style={{ height: 30 }} />
      </div>
    </div>
  );
}

export default App;
