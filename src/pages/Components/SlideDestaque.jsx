import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  destaques as destaq,
  getImgCardapio,
} from "../../services/cardapio.ws";
import RenderImageDestaque from "./RenderImageDestaque";
import { currency_BRL } from "./Currency";
import { i18n } from "../Translate/i18n";
import { Spin } from "antd";
const Destaque = () => {
  const [destaques, setDestaques] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const scrollRef = useRef();
  const scrollIntervalRef = useRef();
  const scrollDirectionRef = useRef(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCardapios = useCallback(async () => {
    const destaques = await destaq();
    setDestaques(destaques);
  }, []);

  useEffect(() => {
    fetchCardapios();
  }, [fetchCardapios]);

  const fetchImages = useCallback(async () => {
    if (destaques.length > 0 && imgSrc.length === 0) {
      const images = await Promise.all(
        destaques.map(async (item) => {
          if (!item.ids) return;
          return await getImgCardapio(item.id, item.ids);
        })
      );
      setImgSrc((prevImgSrc) => [...prevImgSrc, ...images]);
      setIsLoading(false);
    }
  }, [destaques, imgSrc]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    scrollIntervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 200) {
          setDestaques((prevDestaques) => [...prevDestaques, ...destaques]);
        }
        scrollRef.current.scrollLeft += scrollDirectionRef.current;
      }
    }, 20);

    return () => {
      clearInterval(scrollIntervalRef.current);
    };
  }, [destaques]);
  if (isLoading) {
    return <Spin />;
  }
  return (
    <div
      style={{ textAlign: "center", justifyContent: "center", display: "flex" }}
    >
      <div style={{ maxWidth: 550, width: "100%" }}>
        <div style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
          {i18n.t("highlights")}
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
          ref={scrollRef}
        >
          {destaques
            .filter((item) => item.highlight)
            .map((item, index) => {
              return (
                <div
                  style={{
                    width: 200,
                    height: 400,
                    color: "#FFF",
                    fontWeight: "bold",
                    marginInline: 10,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      zIndex: 0,
                      height: "350px",
                    }}
                  >
                    {imgSrc.map((img1, index) =>
                      RenderImageDestaque(img1, index, item.id)
                    )}
                  </div>
                  <div
                    style={{
                      position: "relative",
                      zIndex: 99,
                      marginTop: -50,
                      padding: "10px",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      borderRadius: "0px 0px 10px 10px",
                    }}
                  >
                    <div style={{ fontSize: "1em", fontWeight: "bold" }}>
                      {i18n.t(item.name)}
                    </div>
                    <div>{currency_BRL(item.price)}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Destaque;
