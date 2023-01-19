import React from "react";
import { Carousel } from "antd";
import "../../css/Slide.css";
const SlidesSobemesas = () => {
  const Slide = [
    { id: 1, src: require("../../assets/musse.jpg"), caption: "Musse" },
    { id: 2, src: require("../../assets/pudim.jpg"), caption: "Pudim" },
  ];

  return (
    <div id={"part-11"} style={{ margin: 5 }}>
      <Carousel showArrows={true} autoplay={true}>
        {Slide.map((item) => (
          <div key={item.id}>
            <img src={item.src} alt={item.caption} className="img-fluid" />
            <div className="text-center">{item.caption}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlidesSobemesas;
