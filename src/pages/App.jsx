import "../css/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Affix, FloatButton } from "antd";
import React from "react";
import CollapseMenu from "./modules/Collapse";
import Menu from "./modules/BottonMenu";
import CardSlide from "./modules/CardSlide";
import Dashboard from "../pages/Dashboard";
function App() {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [contar, setContar] = React.useState(0);
  console.log("🚀 ~ file: App.jsx:13 ~ App ~ contar", contar);
  const senha = "saimolindo";
  const [senhaDigitada, setSenhaDigitada] = React.useState("");
  const acessar = () => {
    if (senhaDigitada === senha) {
      setVisible(true);
    } else {
      alert("Senha incorreta");
    }
  };
  React.useEffect(() => {
    if (contar > 5) {
      setVisible2(true);
    }
  }, [contar]);

  return (
    <div>
      {!visible ? (
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
              setContar(contar+1);
            }}
          />
          <Affix offsetTop={10} style={{ marginLeft: "80%" }}>
            <Menu />
          </Affix>
          {visible2 ? (
            <>
              <input
                type="password"
                onChange={(e) => setSenhaDigitada(e.target.value)}
              />
              <button onClick={acessar}>Acessar</button>
            </>
          ) : null}
          <CardSlide />
          <CollapseMenu />
          <FloatButton.BackTop />
          <div style={{ height: 30 }} />{" "}
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
