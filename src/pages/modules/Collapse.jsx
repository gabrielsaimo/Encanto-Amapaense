/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Collapse } from "antd";
import "../../css/Collapse.css";
import { CaretRightOutlined } from "@ant-design/icons";
import SlidesPrincipal from "./SlidePrincipal";
import SlidesSobemesas from "./SlideSobremesas";
import SlidesBebidas from "./SlideBebidas";
import "firebase/database";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { service } from "../../services/firebase.ws";
const { Panel } = Collapse;

const CollapseMenu = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const db = getFirestore(service);
  const colletionRef = collection(db, "cardapio");
  const colletionCategory = collection(db, "categorias_cardapio");
  useEffect(() => {
    cardapio.length == 0 && getCardapio();
    cardapioCategory.length == 0 && getCardapioCategory();
  }, []);
  const getCardapio = async () => {
    const cardapioCollection = await getDocs(colletionRef);
    setCardapio(
      cardapioCollection.docs
        .map((doc) => doc.data())
        .sort((a, b) => a.id - b.id)
    );
  };
  const getCardapioCategory = async () => {
    const cardapioCollection = await getDocs(colletionCategory);
    setCardapioCategory(
      cardapioCollection.docs
        .map((doc) => doc.data())
        .sort((a, b) => a.id - b.id)
    );
  };
  const items = cardapioCategory.map((item1, index) => {
    const key = "part-" + index;
    return (
      <div key={index}>
        {index == 0 ? <SlidesPrincipal /> : null}
        {index == 11 ? <SlidesSobemesas /> : null}
        {index == 12 ? <SlidesBebidas /> : null}
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
                {categotia.category == item1.name &&
                categotia.active == true ? (
                  <div className="border">
                    <div className="flex">
                      <p className="p_1 name">{categotia.name}</p>
                      <p className="p_1 price">
                        {categotia.price % 1 != 0
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
