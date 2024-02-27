import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";
import RenderImageCarousel from "./RenderImageCarousel";
import currency_BRL from "./CurrencyBRL";
import { i18n } from "../Translate/i18n";

const { Panel } = Collapse;

const CardapioItem = ({
  categoryName,
  categoryStyle,
  item,
  memoizedImgSrc,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Só dispara uma vez quando o item entra na tela
    rootMargin: "0px 0px -100px 0px", // Margem de visibilidade
  });

  return (
    <div ref={ref} className={`cardapio-item ${inView ? "slide-in" : ""}`}>
      <Collapse
        bordered={false}
        header={categoryName}
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Panel
          id={categoryName}
          style={categoryStyle}
          header={i18n.t(categoryName)}
        >
          {item.map((categoria, idx) => {
            const isEven = item.length % 2 === 0;
            const isLeftToRight = isEven ? idx % 2 === 0 : idx % 2 !== 0;
            const animationDirection = isLeftToRight
              ? "slide-in-left"
              : "slide-in-right";
            return categoria.type.includes("Cardapio") ? (
              <div key={idx} className={`border`}>
                <div style={{ display: "flex" }}>
                  {categoria.ids &&
                    memoizedImgSrc.map((img1, index) =>
                      RenderImageCarousel(img1, index, categoria.id)
                    )}

                  <div className={`flex ${inView ? animationDirection : ""}`}>
                    <div style={{ width: "100%", display: "contents" }}>
                      <div>
                        <p className="p_1 name georgia-font">
                          {i18n.t(categoria.name)}
                        </p>
                      </div>
                      <div className="flex">
                        <div className="sub">
                          {i18n.t(categoria.sub)}
                          {i18n.t(categoria.description)}
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
                        {`${currency_BRL(categoria.price)}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CardapioItem;
