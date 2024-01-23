import React from "react";
import SlideRenderer from "./slide";
import CardapioItem from "./CardapioItem";

const renderCardapioItems = (Category, cardapio, memoizedImgSrc) => {
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

  return Category.map((item, index) => {
    return (
      <div key={item.name}>
        <SlideRenderer index={index} />
        <CardapioItem
          categoryName={item.name}
          categoryStyle={panelStyle}
          item={cardapio.filter(
            (categoria) => categoria.category === item.name && categoria.active
          )}
          memoizedImgSrc={memoizedImgSrc}
        />
      </div>
    );
  });
};

export default renderCardapioItems;
