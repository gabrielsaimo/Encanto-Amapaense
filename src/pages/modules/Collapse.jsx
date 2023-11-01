/* eslint-disable  */
import React, { useState, useEffect } from "react";
import { Collapse, Modal, Image, Divider, Space } from "antd";
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
  const [imgModal, setImgModal] = useState(null);
  const [AllImg, setSetAllImg] = useState([]);
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
  const renderSlides = (index) => {
    if (index === 0) {
      return <SlidesPrincipal />;
    } else if (index === 11) {
      return <SlidesSobemesas />;
    } else if (index === 14) {
      return <SlidesBebidas />;
    }
    return null;
  };

  const items = cardapioCategory.map((item1, index) => {
    const key = item1.name;

    return (
      <div key={index}>
        {renderSlides(index)}

        <Collapse
          key={index}
          bordered={false}
          header={item1.name}
          defaultActiveKey={Array.from({ length: 31 }, (_, i) => String(i))}
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
                    <div style={{ display: "flex" }}>
                      {categotia.img === undefined ||
                      categotia.img === null ? null : (
                        <div
                          className="img"
                          style={{
                            position: "relative",
                          }}
                        >
                          <Image
                            src={atob(categotia.img)}
                            style={{ borderRadius: 10 }}
                            width={150}
                            height={150}
                          />
                        </div>
                      )}

                      <div className="flex">
                        <div style={{ width: "100%", display: "contents" }}>
                          <div>
                            <p className="p_1 name georgia-font">
                              {categotia.name}
                            </p>
                          </div>
                          <div className="flex">
                            <div className="sub">
                              {categotia.sub} {categotia.description}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            minWidth: "100%",
                            alignItems: "flex-end",
                          }}
                        >
                          <p className="p_1 price georgia-bold-font">
                            {categotia.price % 1 !== 0
                              ? "R$ " + categotia.price.replace(".", ",")
                              : "R$ " + categotia.price + ",00"}
                          </p>
                        </div>
                      </div>
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
