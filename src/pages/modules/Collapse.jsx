/* eslint-disable  */
import React, { useState, useEffect, useMemo } from "react";
import { Collapse, Image, Carousel } from "antd";
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
    if (cardapio.length === 0) {
      gtCardapio();
    }
    if (cardapioCategory.length === 0) {
      getCardapioCategory();
    }
  }, []);

  const gtCardapio = async () => {
    const cardapioCollection = await getCardapio();
    setCardapio(cardapioCollection);
  };

  const getCardapioCategory = async () => {
    const cardapioCollection = await getCategoty();
    setCardapioCategory(cardapioCollection);
  };

  const renderSlides = useMemo(() => {
    return (index) => {
      if (index === 0) {
        return <SlidesPrincipal />;
      } else if (index === 11) {
        return <SlidesSobemesas />;
      } else if (index === 14) {
        return <SlidesBebidas />;
      }
      return null;
    };
  }, []);

  const renderCardapioItems = () => {
    return cardapioCategory.map((item1, index) => {
      const key = item1.name;
      return (
        <div key={key}>
          {renderSlides(index)}

          <Collapse
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
              {cardapio.map((categotia, idx) => {
                if (categotia.category === item1.name && categotia.active) {
                  return (
                    <div key={idx} className="border">
                      <div style={{ display: "flex" }}>
                        {categotia.img && (
                          <div className="img">
                            <Carousel
                              autoplay={true}
                              showArrows={true}
                              dotPosition="bottom"
                              style={{
                                width: "30vw",
                                minWidth: "100px",
                                color: "#fff",
                              }}
                            >
                              {categotia.img.split(",").map((item, index) => (
                                <div key={index}>
                                  <Image
                                    src={atob(item)}
                                    style={{
                                      borderRadius: 10,
                                      color: "#fff",
                                      objectFit: "fill",
                                      minWidth: "100px",
                                    }}
                                    alt="img"
                                    width={"30vw"}
                                    height={"30vw"}
                                  />
                                </div>
                              ))}
                            </Carousel>
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
                  );
                }
                return null;
              })}
            </Panel>
          </Collapse>
        </div>
      );
    });
  };

  return <div style={{ margin: 5 }}>{renderCardapioItems()}</div>;
};

export default CollapseMenu;
