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
import { Affix, Anchor, Button, Carousel, Collapse, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
function App() {
  const topRef = React.useRef(null);
  const [targetOffset, setTargetOffset] = useState(undefined);
  const { Panel } = Collapse;
  const [open, setOpen] = useState(false);
  const placement = "bottom";
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);
  console.log("bem vindo");
  return (
    <div
      className="App"
      style={{
        background:
          " linear-gradient(90deg, rgba(178,125,64,1) 0%, rgba(251,247,244,1) 100%)",
        width: "100%",
        maxWidth: 768,
        height: "100%",
        backgroundSize: "cover",
        justifyContent: "center",
        marginBottom: -50,
        userSelect: "none",
      }}
    >
      <img
        src={require("./assets/logo.png")}
        alt="logo-principal"
        style={{
          width: "95%",
          marginTop: 20,
        }}
        loading="lazy"
      />
      <Affix offsetTop={10} style={{ marginLeft: "80%" }}>
        <Button
          type="primary"
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
          }}
          onClick={showDrawer}
        >
          Menu
        </Button>
      </Affix>

      <Drawer
        title="Selecionar categoria"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div style={{ display: "flex", width: "100%", overflow: "scroll" }}>
          <Anchor
            targetOffset={targetOffset}
            items={[
              {
                key: "part-1",
                href: "#part-1",
                title: "Entradas",
              },
              {
                key: "part-2",
                href: "#part-2",
                title: "Mujicas e Caldos",
              },
              {
                key: "part-3",
                href: "#part-3",
                title: "Peixe ao molho",
              },
              {
                key: "part-4",
                href: "#part-4",
                title: "Peixe frito",
              },
              {
                key: "part-5",
                href: "#part-5",
                title: "Peixe na chapa",
              },
              {
                key: "part-6",
                href: "#part-6",
                title: "Camarão",
              },
              {
                key: "part-7",
                href: "#part-7",
                title: "Carnes",
              },
              {
                key: "part-8",
                href: "#part-8",
                title: "Frango",
              },
              {
                key: "part-9",
                href: "#part-9",
                title: "Moquecas",
              },

              {
                key: "part-10",
                href: "#part-10",
                title: "Caldeiradas",
              },

              {
                key: "part-11",
                href: "#part-11",
                title: "Porções extras",
              },

              {
                key: "part-12",
                href: "#part-12",
                title: "Sobremesas",
              },

              {
                key: "part-13",
                href: "#part-13",
                title: "Bebidas",
              },
            ]}
          />
        </div>
      </Drawer>

      <div style={{ margin: 5 }}>
        <Carousel showArrows={true} autoplay={true}>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/regional.jpeg")}
              alt="c-encanto-regional"
            />
            <div style={{ fontWeight: "bold" }}>Encanto Regional</div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/p_crosta_castanha.jpg")}
              alt="p_crosta_castanha"
            />
            <div style={{ fontWeight: "bold" }}>
              Peixe na crosta da castanha
            </div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/tucuju.jpg")}
              alt="tucuju"
            />
            <div style={{ fontWeight: "bold" }}>Mistura tucuju</div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/camarao_no_bafo.jpg")}
              alt="cararao_no_bafo"
            />
            <div style={{ fontWeight: "bold" }}>Cararão no bafo</div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/calderada.jpg")}
              alt="caldeirada"
            />
            <div style={{ fontWeight: "bold" }}>Caldeirada</div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/isca_de_file.jpg")}
              alt="isca_de_file"
            />
            <div style={{ fontWeight: "bold" }}>Isca de file</div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/peixe_a_delicia.jpg")}
              alt="peixe_a_delicia"
            />
            <div style={{ fontWeight: "bold" }}>Peixe a delícia</div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/peixe_ao_molho_camarao_regional.jpg")}
              alt="peixe_ao_molho_caramarao_regional"
            />
            <div style={{ fontWeight: "bold" }}>
              Peixe ao molho de camarão regional
            </div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/pirao.jpg")}
              alt="pirao"
            />
            <div style={{ fontWeight: "bold" }}>Pirão</div>
          </div>
        </Carousel>
      </div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
          userSelect: "none",
        }}
      >
        <Panel
          id="part-1"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
            userSelect: "none",
            outline: "none",
          }}
          header="Entradas"
          key="1"
        >
          {Entradas.map((Entrada) => (
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Entrada.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Entrada.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Entrada.sub} {Entrada.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-2"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Mujicas e Caldos"
          key="1"
        >
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Mujica.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Mujica.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Mujica.sub} {Mujica.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-3"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Peixe ao molho"
          key="1"
        >
          {peixe_ao_molho.map((Peixe) => (
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
                  width: "95%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Peixe.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Peixe.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Peixe.sub} {Peixe.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-4"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Peixe frito"
          key="1"
        >
          {peixe_frito.map((Peixe) => (
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Peixe.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Peixe.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Peixe.sub} {Peixe.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-5"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Peixe na chapa"
          key="1"
        >
          {peixe_na_chapa.map((Peixe) => (
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Peixe.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Peixe.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Peixe.sub} {Peixe.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-6"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Camarão"
          key="1"
        >
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Camarao.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Camarao.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Camarao.sub} {Camarao.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-7"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Carnes"
          key="1"
        >
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Carnes.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Carnes.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Carnes.sub} {Carnes.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>

      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-8"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Frango"
          key="1"
        >
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Frango.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Frango.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Frango.sub} {Frango.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-9"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Moquecas"
          key="1"
        >
          {moquecas.map((moquecas) => (
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {moquecas.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {moquecas.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {moquecas.sub} {moquecas.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-10"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Caldeiradas"
          key="1"
        >
          {caldeiradas.map((caldeiradas) => (
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {caldeiradas.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {caldeiradas.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {caldeiradas.sub} {caldeiradas.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          id="part-11"
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Porções extras"
          key="1"
        >
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Porcoes_extras.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Porcoes_extras.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Porcoes_extras.sub} {Porcoes_extras.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>
      <div id="part-12" style={{ margin: 5 }}>
        <Carousel showArrows={true} autoplay={true}>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/musse.jpg")}
              alt="musse"
            />
            <div style={{ fontWeight: "bold" }}>Musse</div>
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/pudim.jpg")}
              alt="pudim"
            />
            <div style={{ fontWeight: "bold" }}>Pudim</div>
          </div>
        </Carousel>
      </div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Sobremesas"
          key="1"
        >
          {Sobremesas.map((Sobremesa) => (
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Sobremesa.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Sobremesa.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Sobremesa.sub} {Sobremesa.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>

      <div id="part-13" style={{ margin: 5 }}>
        <Carousel showArrows={true} autoplay={true}>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/drink1.jpg")}
              alt="drink1"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/drink2.jpg")}
              alt="drink2"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/drink3.jpg")}
              alt="drink3"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/drink4.jpg")}
              alt="drink4"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/drink5.jpg")}
              alt="drink5"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/drink6.jpg")}
              alt="drink6"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              src={require("./assets/drink7.jpg")}
              alt="drink7"
            />
          </div>
        </Carousel>
      </div>

      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: "transparent",
          color: "red",
        }}
      >
        <Panel
          style={{
            color: "#7a4827",
            fontWeight: "bold",
            backgroundImage: `url(${require("./assets/tinta.png")}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: 150,
            backgroundPositionX: "55%",
            backgroundPositionY: -8,
          }}
          header="Bebidas"
          key="1"
        >
          {Bebidas.map((Bebida) => (
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
                <p
                  style={{ color: "#7a4827", fontWeight: "bold", flex: "none" }}
                >
                  {Bebida.name}
                </p>
                <p style={{ color: "black", fontWeight: "bold", flex: "none" }}>
                  {Bebida.price}
                </p>
              </div>

              <div
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  flex: "none",
                  fontSize: 10,
                }}
              >
                {Bebida.sub} {Bebida.description}
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>

      <div style={{ height: 30 }}></div>
    </div>
  );
}

export default App;
