import React, { useState, useEffect } from "react";
import card from "../../json/cardSlide.json";
const CardSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === card.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, card]);

  return (
    <div style={{ height: 250 }}>
      <div
        style={{
          background: "white",
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 20,
        }}
      >
        {card.map((item, index) => (
          <div
            key={item.id}
            className="card"
            style={{
              display: item.ativo && index === currentIndex ? "block" : "none",
            }}
          >
            <h1>{item.titulo}</h1>
            <p>{item.mensagem}</p>
            <span>{item.subDescricao}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlide;
