/* eslint-disable  */
import React, { useState, useEffect } from "react";
import { Collapse } from "antd";
import "../../css/Collapse.css";
import { CaretRightOutlined } from "@ant-design/icons";
import SlidesPrincipal from "./SlidePrincipal";
import SlidesSobemesas from "./SlideSobremesas";
import SlidesBebidas from "./SlideBebidas";
import { getCardapio } from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";
const { Panel } = Collapse;

const CollapseMenu = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  useEffect(() => {
    cardapio.length === 0 && gtCardapio();
    cardapioCategory.length === 0 && getCardapioCategory();
  }, []);
  const gtCardapio = async () => {
    const cardapioCollection = await getCardapio();
    setCardapio(cardapioCollection);
  };
  const getCardapioCategory = async () => {
    const cardapioCollection = await getCategoty();
    setCardapioCategory(cardapioCollection);
  };
  const items = cardapioCategory.map((item1, index) => {
    const key = "part-" + index;
    return (
      <div key={index}>
        {index === 0 ? <SlidesPrincipal /> : null}
        {index === 11 ? <SlidesSobemesas /> : null}
        {index === 14 ? <SlidesBebidas /> : null}
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
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
          ]}
          destroyInactivePanel={false}
          expandIconPosition="end"
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
              backgroundPositionX: "50%",
              backgroundPositionY: -8,
            }}
            header={item1.name}
          >
            {cardapio.map((categotia, index) => (
              <div key={index}>
                {categotia.category === item1.name &&
                categotia.active === true ? (
                  <div className="border">
                    <div className="flex">
                      <p className="p_1 name georgia-font">{categotia.name}</p>
                      <p className="p_1 price georgia-bold-font">
                        {/*"R$ " + categotia.price.toFixed(2).replace(".", ",")*/}
                        {categotia.price % 1 !== 0
                          ? "R$ " + categotia.price.replace(".", ",")
                          : "R$ " + categotia.price + ",00"}
                      </p>
                    </div>

                    <div className="sub">
                      {categotia.sub} {categotia.description}
                    </div>
                  </div>
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
