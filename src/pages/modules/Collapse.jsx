/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import { Carousel, Spin } from "antd";

import "../../css/Collapse.css";
import { getCardapio, getImgCardapio } from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";
import CardapioItem from "../Components/CardapioItem";
import SlideRenderer from "../Components/slide";

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

  const renderCardapioItems = () => {
    return cardapioCategory.map((item, index) => {
      const key = item.name;
      return (
        <div key={key}>
          <SlideRenderer index={index} />
          <CardapioItem
            categoryName={key}
            categoryStyle={panelStyle}
            item={cardapio.filter(
              (categoria) => categoria.category === key && categoria.active
            )}
            memoizedImgSrc={memoizedImgSrc}
          />
        </div>
      );
    });
  };

  return <div style={{ margin: 5 }}>{renderCardapioItems()}</div>;
};

export default CollapseMenu;
