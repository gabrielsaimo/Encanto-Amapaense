import React, { useEffect, useState, useMemo } from "react";
import "../../css/Collapse.css";
import { getCardapio, getImgCardapio } from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";
import renderCardapioItems from "../Components/renderCardapio";

const CollapseMenu = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);

  useEffect(() => {
    fetchCardapios();
    fetchCardapioCategory();
  }, []);

  const fetchCardapios = async () => {
    try {
      const cardapios = await getCardapio();
      setCardapio(cardapios);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCardapioCategory = async () => {
    try {
      const category = await getCategoty();
      setCardapioCategory(category);
    } catch (err) {
      console.log(err);
    }
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

  return (
    <div style={{ margin: 5 }}>
      {renderCardapioItems(cardapioCategory, cardapio, memoizedImgSrc)}
    </div>
  );
};

export default CollapseMenu;
