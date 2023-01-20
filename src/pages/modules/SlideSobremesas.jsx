import React from "react";
import { Carousel, Image } from "antd";
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
            <Image
              src={item.src}
              alt={item.caption}
              height={600}
              className="img-fluid"
            />
            <div className="text-center">{item.caption}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlidesSobemesas;
