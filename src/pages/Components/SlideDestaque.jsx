import React, { useEffect, useMemo, useState } from "react";
import {
  destaques as destaq,
  getImgCardapio,
} from "../../services/cardapio.ws";
import RenderImageDestaque from "./RenderImageDestaque";
import currency_BRL from "./CurrencyBRL";
const Destaque = () => {
  const [destaques, setDestaques] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  useEffect(() => {
    fetchCardapios();
  }, []);
  const fetchCardapios = async () => {
    const destaques = await destaq();
    setDestaques(destaques);
  };

  const memoizedImgSrc = useMemo(() => {
    if (destaques.length > 0 && imgSrc.length === 0) {
      const images = [];
      destaques.forEach(async (item) => {
        if (!item.ids) return;
        const img = await getImgCardapio(item.id, item.ids);
        setImgSrc((prevImgSrc) => [...prevImgSrc, img]);
        images.push(img);
      });
      return images;
    }
    return imgSrc;
  }, [destaques, imgSrc]);

  return (
    <div style={{ width: "100vw" }}>
      <div style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
        Destaques
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          overflowY: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          marginTop: 20,
        }}
      >
        {destaques
          .filter((item, index) => item.highlight)
          .map((item, index) => {
            return (
              <div
                style={{
                  width: 200,
                  height: 400,
                  color: "#FFF",
                  fontWeight: "bold",
                  margin: 10,
                }}
              >
                <div style={{ position: "relative", zIndex: 0 }}>
                  {memoizedImgSrc.map((img1, index) =>
                    RenderImageDestaque(img1, index, item.id)
                  )}
                </div>
                <div
                  style={{
                    position: "relative",
                    zIndex: 99,
                    marginTop: -58,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: 5,
                    borderRadius: "0px 0px 10px 10px",
                  }}
                >
                  <div style={{ fontSize: "1em", fontWeight: "bold" }}>
                    {item.name}
                  </div>
                  <div>{currency_BRL(item.price)}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Destaque;
