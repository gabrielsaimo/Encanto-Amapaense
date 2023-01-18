import React from "react";
import { Carousel } from "antd";

const SlidesSobemesas = () => {
  const Slide = [
    { id: 1, src: require("../../assets/musse.jpg"), caption: "Musse" },
    { id: 2, src: require("../../assets/pudim.jpg"), caption: "Pudim" },
  ];

  return (
    <div style={{ margin: 5 }}>
      <Carousel showArrows={true} autoplay={true}>
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
            <div
              style={{
                WebkitBackgroundClip: "text",
                fontWeight: "bold",
                flex: "none",
                fontSize: 15,
                color: "transparent",
                backgroundClip: "text",
                backgroundImage: "linear-gradient(60deg,#7a4827,#000)",
              }}
            >
              {item.caption}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlidesSobemesas;
