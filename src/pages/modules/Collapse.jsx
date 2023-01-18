import React from "react";
import { Collapse } from "antd";
import "../../css/Collapse.css";
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
          ]}
          destroyInactivePanel={true}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{
            background: "transparent",
          }}
        >
          <Panel
            id={key}
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
                    <div className="border">
                      <div className="flex">
                        <p className="p_1 name">{categotia.name}</p>
                        <p className="p_1 price">{categotia.price}</p>
                      </div>

                      <div className="sub">
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

  return <div style={{ margin: 5 }}>{items}</div>;
};

export default CollapseMenu;
