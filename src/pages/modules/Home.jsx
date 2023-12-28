import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Card, FloatButton, Modal, Space } from "antd";
import { Link } from "react-router-dom";
import "../../css/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../modules/footer";
function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // Defina aqui o ponto de quebra para dispositivos móveis (768 é um exemplo)
    }

    handleResize(); // Verifica o tamanho da tela inicialmente
    window.addEventListener("resize", handleResize); // Adiciona um listener para redimensionamento

    return () => {
      window.removeEventListener("resize", handleResize); // Remove o listener ao desmontar o componente
    };
  }, []);

  return (
    <div className="App background_fundo">
      <LazyLoadImage
        src={require("../../assets/fundo.webp")}
        className="fundo"
        alt="fundo"
        decoding="async"
        loading="eager"
      />
      <LazyLoadImage
        src={require("../../assets/logo.webp")}
        className="logo"
        alt="logo-principal"
        loading="eager"
        decoding="async"
      />

      <Space direction="vertical" style={{ margin: "10px 0" }}></Space>

      <div
        style={
          isMobile
            ? {
                display: "Flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }
            : { display: "Flex", justifyContent: "space-around" }
        }
      >
        <Card
          className="card rainbow-box"
          style={
            isMobile
              ? {
                  width: "80vw",
                  marginTop: "60px",
                  background:
                    "linear-gradient( 90deg,rgba(178, 125, 64, 1) 0%,rgba(251, 247, 244, 1) 100%)",
                }
              : {
                  width: "40vw",
                  background:
                    "linear-gradient( 90deg,rgba(178, 125, 64, 1) 0%,rgba(251, 247, 244, 1) 100%)",
                }
          }
        >
          <LazyLoadImage
            src={require("../../assets/logo.webp")}
            className="logo"
            style={{ marginTop: "-80px" }}
            alt="logo-principal"
            loading="eager"
            decoding="async"
          />
          <Button style={{ backgroundColor: "rgba(178, 125, 64, 1)" }}>
            <Link to="/Cardapio"> Cardapio</Link>
          </Button>
        </Card>
        <Card
          className="card rainbow-box"
          style={
            isMobile
              ? {
                  width: "80vw",
                  marginTop: "60px",
                  background:
                    "linear-gradient( 90deg,rgba(178, 125, 64, 1) 0%,rgba(251, 247, 244, 1) 100%)",
                }
              : {
                  width: "40vw",
                  background:
                    "linear-gradient( 90deg,rgba(178, 125, 64, 1) 0%,rgba(251, 247, 244, 1) 100%)",
                }
          }
        >
          <LazyLoadImage
            src={require("../../assets/logo.webp")}
            className="logo"
            style={{ marginTop: "-80px" }}
            alt="logo-principal"
            loading="eager"
            decoding="async"
          />
          <Button style={{ backgroundColor: "rgba(178, 125, 64, 1)" }}>
            <Link to="/Delivery"> Delivery</Link>
          </Button>
        </Card>
      </div>

      <FloatButton.BackTop />

      <Footer />
      <div style={{ height: 30 }} />
    </div>
  );
}

export default Home;
