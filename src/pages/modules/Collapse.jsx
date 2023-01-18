import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import cardapio from "../../json/cardapio.json";
import SlidesPrincipal from "./SlidePrincipal";
import SlidesSobemesas from "./SlideSobremesas";
import SlidesBebidas from "./SlideBebidas";
const { Panel } = Collapse;

const CollapseMenu = () => {
  const Array = [
    "Entrada",
    "Mujicas e caldos",
    "Peixe ao molho",
    "Peixe Frito",
    "Peixe na chapa",
    "Camarão",
    "Carnes",
    "Frango",
    "Moquecas",
    "Caldeiradas",
    "Porções Extras",
    "Sobremesas",
    "Bebidas",
  ];
  const items = Array.map((item1, index) => {
    const key = "part-" + index;
    return (
      <div>
        {index === 0 ? <SlidesPrincipal /> : null}
        {index === 11 ? <SlidesSobemesas /> : null}
        {index === 12 ? <SlidesBebidas /> : null}
        <Collapse
          key={index}
          bordered={false}
          defaultActiveKey={[
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
          ]}
          destroyInactivePanel={true}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{
            background: "transparent",
            color: "red",
          }}
        >
          <Panel
            id={key === "part-12" ? "part-13" : key}
            style={{
              color: "#7a4827",
              fontWeight: "bold",
              backgroundImage: `url(${require("../../assets/tinta.png")}) `,
              backgroundRepeat: "no-repeat",
              backgroundSize: 150,
              backgroundPositionX: "55%",
              backgroundPositionY: -8,
            }}
            header={item1}
          >
            {cardapio.map((categotia) => (
              <div>
                {categotia.category == item1 ? (
                  <>
                    <div
                      style={{
                        border: "3px solid white",
                        borderRadius: 10,
                        borderColor: "#7a4827",
                        margin: 10,
                        marginBottom: 45,
                        padding: 5,
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
                          style={{
                            WebkitBackgroundClip: "text",
                            fontWeight: "bold",
                            flex: "none",
                            fontSize: 15,
                            color: "transparent",
                            backgroundClip: "text",
                            backgroundImage:
                              "linear-gradient(60deg,#7a4827,#000)",
                          }}
                        >
                          {categotia.name}
                        </p>
                        <p
                          style={{
                            WebkitBackgroundClip: "text",
                            fontWeight: "bold",
                            flex: "none",
                            color: "transparent",
                            backgroundClip: "text",
                            backgroundImage:
                              "linear-gradient(60deg, #000,#000 )",
                          }}
                        >
                          {categotia.price}
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
                        {categotia.sub} {categotia.description}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </Panel>
        </Collapse>
      </div>
    );
  });

  return (
    <div id="part-12" style={{ margin: 5 }}>
      {items}
    </div>
  );
};

export default CollapseMenu;
