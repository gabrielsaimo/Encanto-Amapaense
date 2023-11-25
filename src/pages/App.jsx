import React, { useState, useEffect, Suspense, lazy } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Affix, Button, FloatButton, Input, Modal, Space, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import "../css/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Menu from "./modules/BottonMenu";
import Msn from "./modules/Msn";
import Footer from "./modules/footer";
import { getStatusPedidos } from "../services/Pedidos.ws";
const CollapseMenu = lazy(() => import("./modules/Collapse"));
function App() {
  const { idCompany } = useParams();
  console.log("🚀 ~ file: App.jsx:14 ~ App ~ idCompany:", idCompany);
  const [visible2, setVisible2] = useState(false);
  const [contar, setContar] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    if (contar > 10 && contar < 15) {
      setVisible2(true);
    }
  }, [contar]);

  const handleLogoClick = async () => {
    setContar(contar + 1);
  };

  const getMesas = (e) => {
    setPedidos([]);
    if (e === "") return;
    getPedidos(e);
  };

  async function getPedidos(e) {
    const data = await getStatusPedidos(e);
    setPedidos(data);
  }

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
      <div style={{ display: "flex" }}>
        {/*<Affix offsetTop={10} style={{ marginLeft: "40%" }}>
          <Button
            type="primary"
            onClick={() => setVisible(true)}
            style={{
              backgroundColor: "#4CAF50",
              borderColor: "#4CAF50",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            Acompanhar Pedido
          </Button>
        </Affix>*/}
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
