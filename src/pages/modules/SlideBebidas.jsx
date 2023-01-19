import React from "react";
import { Carousel } from "antd";
import "../../css/Slide.css";
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
    <div id={"part-12"} style={{ margin: 5 }}>
      <Carousel showArrows={true} autoplay={true} effect={"fade"}>
        {Slide.map((item) => (
          <div key={item.id}>
            <img className="img-fluid" src={item.src} alt={item.caption} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlidesBebidas;
