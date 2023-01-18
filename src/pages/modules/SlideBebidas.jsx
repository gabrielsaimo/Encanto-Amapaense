import React from "react";
import { Carousel } from "antd";

const SlidesBebidas = () => {
  const Slide = [
    { id: 1, src: require("../../assets/drink1.jpg"), caption: "Bebidas" },
    { id: 2, src: require("../../assets/drink2.jpg"), caption: "Bebidas" },
    { id: 3, src: require("../../assets/drink3.jpg"), caption: "Bebidas" },
    { id: 4, src: require("../../assets/drink4.jpg"), caption: "Bebidas" },
    { id: 5, src: require("../../assets/drink5.jpg"), caption: "Bebidas" },
    { id: 6, src: require("../../assets/drink6.jpg"), caption: "Bebidas" },
    { id: 7, src: require("../../assets/drink7.jpg"), caption: "Bebidas" },
  ];

  return (
    <div style={{ margin: 5 }}>
      <Carousel showArrows={true} autoplay={true} effect={"fade"}>
        {Slide.map((item) => (
          <div key={item.id}>
            <img
              src={item.src}
              alt={item.caption}
              style={{
                width: "100%",
                height: 600,
                borderRadius: 10,
                objectFit: "fill",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlidesBebidas;
