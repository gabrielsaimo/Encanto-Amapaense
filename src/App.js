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
} from "./json/data";
import { Anchor, Carousel, Collapse, theme } from "antd";
import React, { useEffect, useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
function App() {
  const topRef = React.useRef(null);
  const [targetOffset, setTargetOffset] = useState(undefined);
  const { Panel } = Collapse;
  const { token } = theme.useToken();
  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);

  return (
    <div
      className="App"
      style={{
        background:
          " linear-gradient(90deg, rgba(178,125,64,1) 0%, rgba(251,247,244,1) 100%)",
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        justifyContent: "center",
        marginBottom: -50,
      }}
    >
      <img
        src={require("./assets/logo_pricipal.jpeg")}
        alt="logo-principal"
        style={{ width: "70%", borderRadius: "10%", marginTop: 20 }}
        loading="lazy"
      />
      <div style={{ display: "flex" , width:"100%",overflow:"scroll"}}>

      <Anchor
        targetOffset={targetOffset}
        items={[
        {
          key: "part-1",
          href: "#part-1",
          title: "Entradas",
        }
        ]}
        />

        <Anchor
        targetOffset={targetOffset}
        items={[
        {
          key: "part-2",
          href: "#part-2",
          title: "Mujicas e Caldos",
        }
        ]}
        />

        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-3",
              href: "#part-3",
              title: "Peixe ao molho",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-4",
              href: "#part-4",
              title: "Peixe frito",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-5",
              href: "#part-5",
              title: "Peixe na chapa",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-6",
              href: "#part-6",
              title: "Camarão",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-7",
              href: "#part-7",
              title: "Carnes",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-8",
              href: "#part-8",
              title: "Frango",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-9",
              href: "#part-9",
              title: "Moquecas",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-10",
              href: "#part-10",
              title: "Caldeiradas",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-11",
              href: "#part-11",
              title: "Porções extras",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-12",
              href: "#part-12",
              title: "Sobremesas",
            },
          ]}
        />
        <Anchor
          targetOffset={targetOffset}
          items={[
            {
              key: "part-13",
              href: "#part-13",
              title: "Bebidas",
            },
          ]}
        />
      </div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "black",
        }}
      >
        <Panel id="part-1" header="Entradas" key="1">
          {Entradas.map((Entrada) => (
            <div
              id="part-1"
              style={{
                border: "2px solid white",
                borderRadius: 10,
                borderColor: "#7a4827",
                margin: 10,
                marginBottom: 45,
              }}
            >
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Entrada.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Entrada.price}
                </p>
              </div>

              <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                {Entrada.sub} {Entrada.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>
      <div style={{ margin: 5 }}>
        <Carousel showArrows={true} autoplay={true}>
          <div>
            <img
              style={{ width: "100%", height: 400, borderRadius: 10 }}
              src={require("./assets/regional.jpeg")}
              alt="c-encanto-regional"
            />
            <div style={{ fontWeight: "bold" }}>Encanto Regional</div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 400, borderRadius: 10 }}
              src={require("./assets/p_crosta_castanha.jpg")}
              alt="p_crosta_castanha"
            />
            <div style={{ fontWeight: "bold" }}>
              Peixe na crosta da castanha
            </div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 400, borderRadius: 10 }}
              src={require("./assets/tucuju.jpg")}
              alt="tucuju"
            />
            <div style={{ fontWeight: "bold" }}>Mistura tucuju</div>
          </div>
        </Carousel>
      </div>

      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
        id="part-2"
      >
        Mujicas e Caldos
      </div>
      {mujicas_caldos.map((Mujica) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Mujica.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Mujica.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Mujica.sub} {Mujica.description}
          </div>
        </div>
      ))}

      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Peixe ao Molho
      </div>
      {peixe_ao_molho.map((Peixe_ao_molho) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Peixe_ao_molho.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Peixe_ao_molho.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Peixe_ao_molho.sub} {Peixe_ao_molho.description}
          </div>
        </div>
      ))}
      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Peixe Frito
      </div>
      {peixe_frito.map((Peixe_frito) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Peixe_frito.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Peixe_frito.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Peixe_frito.sub} {Peixe_frito.description}
          </div>
        </div>
      ))}

      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Peixe na Chapa
      </div>
      {peixe_na_chapa.map((Peixe_na_chapa) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Peixe_na_chapa.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Peixe_na_chapa.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Peixe_na_chapa.sub} {Peixe_na_chapa.description}
          </div>
        </div>
      ))}

      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Camarão
      </div>

      {camarao.map((Camarao) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Camarao.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Camarao.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Camarao.sub} {Camarao.description}
          </div>
        </div>
      ))}

      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Carnes
      </div>
      {carnes.map((Carnes) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Carnes.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Carnes.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Carnes.sub} {Carnes.description}
          </div>
        </div>
      ))}
      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Frango
      </div>

      {frango.map((Frango) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Frango.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Frango.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Frango.sub} {Frango.description}
          </div>
        </div>
      ))}

      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Moquecas
      </div>
      {moquecas.map((Moquecas) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Moquecas.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Moquecas.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Moquecas.sub} {Moquecas.description}
          </div>
        </div>
      ))}
      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Caldeiradas
      </div>
      {caldeiradas.map((Caldeiradas) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Caldeiradas.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Caldeiradas.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Caldeiradas.sub} {Caldeiradas.description}
          </div>
        </div>
      ))}
      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Porcoes Extras
      </div>
      {Porcoes_extras.map((Porcoes_extras) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Porcoes_extras.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Porcoes_extras.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Porcoes_extras.sub} {Porcoes_extras.description}
          </div>
        </div>
      ))}
      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Sobremesas
      </div>
      {Sobremesas.map((Sobremesas) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Sobremesas.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Sobremesas.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Sobremesas.sub} {Sobremesas.description}
          </div>
        </div>
      ))}
      <div
        style={{
          padding: 25,
          color: "white",
          fontWeight: "bold",
          backgroundImage: `url(${require("./assets/tinta.png")}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundSize: 150,
          backgroundPosition: "center",
        }}
      >
        Bebidas
      </div>
      {Bebidas.map((Bebidas) => (
        <div
          style={{
            border: "2px solid white",
            borderRadius: 10,
            borderColor: "#7a4827",
            margin: 10,
            marginBottom: 45,
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}>
              {Bebidas.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
              {Bebidas.price}
            </p>
          </div>

          <div style={{ color: "black", fontWeight: "bold", flex: "none" }}>
            {Bebidas.sub} {Bebidas.description}
          </div>
        </div>
      ))}
      <div style={{ height: 30 }}></div>
    </div>
  );
}

export default App;
