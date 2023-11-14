/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { Collapse, Carousel, Spin } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import LazyLoad from "react-lazyload";
import "../../css/Collapse.css";
import SlidesPrincipal from "./SlidePrincipal";
import SlidesSobemesas from "./SlideSobremesas";
import SlidesBebidas from "./SlideBebidas";
import { getCardapio, getImgCardapio } from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";

const { Panel } = Collapse;
const LazyLoadedImage = lazy(() =>
  import("antd").then((module) => ({ default: module.Image }))
);

const CollapseMenu = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);

  useEffect(() => {
    if (cardapio.length === 0) {
      getCardapios();
    }
    if (cardapioCategory.length === 0) {
      getCardapioCategory();
    }
    if (cardapio.length > 0 && imgSrc.length === 0) {
      getImgCardapioWS();
    }
  }, [cardapio]);

  const getCardapios = async () => {
    const cardapioCollection = await getCardapio();
    setCardapio(cardapioCollection);
  };

  const getCardapioCategory = async () => {
    const cardapioCollection = await getCategoty();
    setCardapioCategory(cardapioCollection);
  };

  const getImgCardapioWS = async () => {
    for (let i = 0; i < cardapio.length; i++) {
      if (!cardapio[i].ids) {
        continue; 
      }
      const img = await getImgCardapio(cardapio[i].id, cardapio[i].ids);
      setImgSrc((prevImgSrc) => [...prevImgSrc, img]);
    }
  };

  const renderImageCarousel = (img, index, id) =>
    img[0].idreq === id && (
      <div className="img" key={index} style={{ zIndex: 5 }}>
        <LazyLoad key={index} height={200} offset={100}>
          <Carousel
            autoplay={true}
            autoplaySpeed={2000}
            showArrows={true}
            Swiping={true}
            draggable={true}
            effect="fade"
            dotPosition="bottom"
            style={{
              width: "45vw",
              minWidth: "100px",
              color: "#fff",
            }}
          >
            {img
              .filter((img1) => img1.idreq && img1.idreq === id)
              .map((img1, index) => (
                <Suspense key={index} fallback={<Spin />}>
                  <LazyLoadedImage
                    src={atob(img1.imagem)}
                    key={index}
                    style={{
                      borderRadius: 10,
                      color: "#fff",
                      objectFit: "fill",
                      minWidth: "100px",
                    }}
                    alt="img"
                    width={"45vw"}
                    loading="lazy"
                  />
                </Suspense>
              ))}
          </Carousel>
        </LazyLoad>
      </div>
    );

  const renderSlides = useMemo(() => {
    return (index) => {
      if (index === 0) {
        return (
          <Suspense fallback={<Spin />}>
            <SlidesPrincipal />
          </Suspense>
        );
      } else if (index === 11) {
        return (
          <Suspense fallback={<Spin />}>
            <SlidesSobemesas />
          </Suspense>
        );
      } else if (index === 14) {
        return (
          <Suspense fallback={<Spin />}>
            <SlidesBebidas />
          </Suspense>
        );
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
          <Suspense fallback={<Spin />}>
            <Collapse
              bordered={false}
              header={item1.name}
              easing="ease-in-out"
              waitForAnimate={true}
              defaultActiveKey={Array.from({ length: 1 }, (_, i) => String(i))}
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
                {cardapio
                  .filter(
                    (categoria) =>
                      categoria.category === item1.name && categoria.active
                  )
                  .map((categoria, idx) => (
                    <div key={idx} className="border">
                      <div style={{ display: "flex" }}>
                        {categoria.ids &&
                          imgSrc.map((img1, index) =>
                            renderImageCarousel(img1, index, categoria.id)
                          )}

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
                              {`R$ ${
                                categoria.price % 1 !== 0
                                  ? categoria.price.replace(".", ",")
                                  : categoria.price + ",00"
                              }`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Panel>
            </Collapse>
          </Suspense>
        </div>
      );
    });
  };

  return <div style={{ margin: 5 }}>{renderCardapioItems()}</div>;
};

export default CollapseMenu;
