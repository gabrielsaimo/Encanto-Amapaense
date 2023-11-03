import React, { useState, useEffect, Suspense, lazy } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Affix, Button, FloatButton, Modal, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import "../css/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Menu from "./modules/BottonMenu";
import Msn from "./modules/Msn";
import Footer from "./modules/footer";
const CollapseMenu = lazy(() => import("./modules/Collapse"));
function App() {
  const [visible2, setVisible2] = useState(false);
  const [contar, setContar] = useState(0);

  useEffect(() => {
    if (contar > 10 && contar < 15) {
      setVisible2(true);
    }
  }, [contar]);

  const handleLogoClick = async () => {
    setContar(contar + 1);
  };

  return (
    <div className="App background_fundo">
      <LazyLoadImage
        src={require("../assets/fundo.webp")}
        className="fundo"
        alt="fundo"
        decoding="async"
        loading="eager"
      />
      <LazyLoadImage
        src={require("../assets/logo.webp")}
        className="logo"
        alt="logo-principal"
        loading="eager"
        decoding="async"
        onClick={() => handleLogoClick()}
      />
      <Affix offsetTop={10} style={{ marginLeft: "80%" }}>
        <Menu />
      </Affix>
      <Suspense fallback={<Spin />}>
        <CollapseMenu />
      </Suspense>

      <Space direction="vertical" style={{ margin: "10px 0" }}></Space>
      <Modal open={visible2} footer={null} closable={true} width={150}>
        <Space direction="vertical">
          <Button>
            <Link to="/Dashboard"> Dashboard</Link>
          </Button>
          <Button>
            <Link to="/Garçom"> Garçom</Link>
          </Button>
          <Button>
            <Link to="/Cozinha"> Cozinha</Link>
          </Button>
          <Button>
            <Link to="/Bar"> Bar</Link>
          </Button>
        </Space>
      </Modal>
      <FloatButton.BackTop />
      <Msn />
      <Footer />
      <div style={{ height: 30 }} />
    </div>
  );
}

export default App;
