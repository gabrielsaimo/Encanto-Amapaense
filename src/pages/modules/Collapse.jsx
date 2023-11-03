/* eslint-disable  */
import React, { useState, useEffect, useMemo } from "react";
import { Collapse, Image, Carousel } from "antd";
import "../../css/Collapse.css";
import { CaretRightOutlined } from "@ant-design/icons";
import SlidesPrincipal from "./SlidePrincipal";
import SlidesSobemesas from "./SlideSobremesas";
import SlidesBebidas from "./SlideBebidas";
import { getCardapio, getImgCardapio } from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";

const { Panel } = Collapse;

const CollapseMenu = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
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
    for (let i = 0; i < cardapioCollection.length; i++) {
      await getImgCardapioWS(
        cardapioCollection[i].id,
        cardapioCollection[i].ids
      );
    }
    setCardapio(cardapioCollection);
  };

  const getCardapioCategory = async () => {
    const cardapioCollection = await getCategoty();
    setCardapioCategory(cardapioCollection);
  };

  const getImgCardapioWS = async (idimg, ids) => {
    if (ids === null) {
      return null;
    }
    const img = await getImgCardapio(idimg, ids);
    imgSrc.push(img);
    return img;
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
                backgroundImage: `url(${require("../../assets/tinta.webp")}) `,
                backgroundRepeat: "no-repeat",
                backgroundSize: 150,
                backgroundPositionX: "50%",
                backgroundPositionY: -8,
              }}
              header={item1.name}
            >
              {cardapio.map((categoria, idx) => {
                if (categoria.category === item1.name && categoria.active) {
                  return (
                    <div key={idx} className="border">
                      <div style={{ display: "flex" }}>
                        {imgSrc.map((img1, index) => (
                          <div className="img">
                            {img1.map((img, index) => (
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
                                {categoria.id === img.idreq && (
                                  <div key={index}>
                                    <Image
                                      src={atob(img.imagem)}
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
                                )}
                              </Carousel>
                            ))}
                          </div>
                        ))}

                        <div className="flex">
                          <div style={{ width: "100%", display: "contents" }}>
                            <div>
                              <p className="p_1 name georgia-font">
                                {categoria.name}
                              </p>
                            </div>
                            <div className="flex">
                              <div className="sub">
                                {categoria.sub} {categoria.description}
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
                              {categoria.price % 1 !== 0
                                ? "R$ " + categoria.price.replace(".", ",")
                                : "R$ " + categoria.price + ",00"}
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
