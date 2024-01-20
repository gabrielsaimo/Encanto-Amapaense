/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { Carousel, Spin } from "antd";
import LazyLoad from "react-lazyload";
import "../../css/Collapse.css";
import { getCardapio, getImgCardapio } from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";
import CardapioItem from "../Components/CardapioItem";
import SlideRenderer from "../Components/slide";
const LazyLoadedImage = lazy(() =>
  import("antd").then((module) => ({ default: module.Image }))
);

const CollapseMenu = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);

  const panelStyle = {
    color: "#7a4827",
    fontWeight: "bold",
    backgroundImage: `url(${require("../../assets/tinta.webp")}) `,
    backgroundRepeat: "no-repeat",
    backgroundSize: 150,
    minWidth: 360,
    backgroundPosition: "center",
    backgroundPositionX: "50%",
    backgroundPositionY: -8,
  };

  useEffect(() => {
    if (cardapio.length === 0) {
      getCardapios();
    }
    if (cardapioCategory.length === 0) {
      getCardapioCategory();
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

  const memoizedImgSrc = useMemo(() => {
    if (cardapio.length > 0 && imgSrc.length === 0) {
      const images = [];
      cardapio.forEach(async (item) => {
        if (!item.ids) return;
        const img = await getImgCardapio(item.id, item.ids);
        setImgSrc((prevImgSrc) => [...prevImgSrc, img]);
        images.push(img);
      });
      return images;
    }
    return imgSrc;
  }, [cardapio, imgSrc]);

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
              maxWidth: 300,
              minWidth: "100px",
              color: "#fff",
            }}
          >
            {img
              .filter((img1) => img1.idreq && img1.idreq === id)
              .map((img1, index) => (
                <Suspense key={index} fallback={<Spin />}>
                  <div style={{ width: "45vw", maxWidth: 300 }}>
                    <LazyLoadedImage
                      src={atob(img1.imagem)}
                      key={index}
                      style={{
                        borderRadius: 10,
                        color: "#fff",
                        minWidth: "100px",
                        minHeight: 300,
                      }}
                      alt="img"
                      objectFit="cover"
                      width={"100%"}
                      loading="lazy"
                    />
                  </div>
                </Suspense>
              ))}
          </Carousel>
        </LazyLoad>
      </div>
    );

  const renderCardapioItems = () => {
    return cardapioCategory.map((item, index) => {
      const key = item.name;
      return (
        <div key={key}>
          <SlideRenderer index={index} />
          <CardapioItem
            categoryName={item.name}
            categoryStyle={panelStyle}
            item={cardapio.filter(
              (categoria) =>
                categoria.category === item.name && categoria.active
            )}
            memoizedImgSrc={memoizedImgSrc}
            renderImageCarousel={renderImageCarousel}
          />
        </div>
      );
    });
  };

  return <div style={{ margin: 5 }}>{renderCardapioItems()}</div>;
};

export default CollapseMenu;
