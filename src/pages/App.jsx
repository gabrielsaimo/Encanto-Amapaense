import React, { useState, useEffect, Suspense, lazy, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Affix, Button, FloatButton, Input, Modal, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import "../css/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Menu from "./modules/BottonMenu";
import Msn from "./modules/Msn";
import Footer from "./modules/footer";
import { getStatusPedidos } from "../services/Pedidos.ws";
const CollapseMenu = lazy(() => import("./modules/Collapse"));

const fundo = require("../assets/fundo.webp");
const logo = require("../assets/logo.webp");

function App() {
  const [visible2, setVisible2] = useState(false);
  const [contar, setContar] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (contar > 10 && contar < 15) {
      setVisible2(true);
    }
  }, [contar]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = logo;
    document.head.appendChild(link);
  }, []);

  const handleLogoClick = useCallback(() => {
    setContar(contar + 1);
  }, [contar]);

  const getMesas = useCallback((e) => {
    setPedidos([]);
    if (e === "") return;
    getPedidos(e);
  }, []);

  async function getPedidos(e) {
    const data = await getStatusPedidos(e);
    setPedidos(data);
  }

  return (
    <div className="App background_fundo">
      <LazyLoadImage
        src={fundo}
        className="fundo"
        alt="fundo"
        decoding="async"
        loading="eager"
      />
      <LazyLoadImage
        src={logo}
        className="logo"
        alt="logo-principal"
        loading="eager"
        decoding="async"
        onClick={handleLogoClick}
      />
      <div style={{ display: "flex" }}>
        <Affix
          offsetTop={10}
          style={{ position: "fixed", right: 10, top: 10, zIndex: 9 }}
        >
          <Menu />
        </Affix>
      </div>

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
      <Modal
        open={visible}
        footer={null}
        closable={true}
        onCancel={() => setVisible(false)}
      >
        <div
          style={{
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            display: "grid",
            gridGap: "10px",
          }}
        >
          <div>
            <label>Mesa: </label>
            <Input
              placeholder="Mesa"
              type="number"
              style={{ width: 100 }}
              onKeyUp={(e) => getMesas(e.target.value)}
            />
          </div>
          <div>
            {pedidos.map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    backgroundImage:
                      item.status === "Em Analize"
                        ? "linear-gradient(to right,#c4c4c4, #8f8f8f)"
                        : item.status === "Em Preparo"
                        ? "linear-gradient(to right,#ff8c00, #d67600)"
                        : item.status === "Pronto"
                        ? "linear-gradient(to right,#4CAF50, #009200)"
                        : "linear-gradient(to right,#2ea100, #1d6600)",
                    color: "#fff",
                    padding: 5,
                    borderRadius: 5,
                    margin: 5,
                  }}
                >
                  <div style={{ textAlign: "center" }}> {item.status}</div>
                  <div style={{ marginLeft: 10 }}>
                    x{item.qdt} - {item.item}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <FloatButton.BackTop />
      <Msn />
      <Footer />
      <div style={{ height: 30 }} />
    </div>
  );
}

export default App;
