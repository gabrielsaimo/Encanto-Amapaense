import React from "react";
import { Carousel } from "antd";
const SlidesPrincipal = () => {
  const Slide = [
    {
      id: 1,
      src: require("../../assets/regional.jpeg"),
      caption: "Encanto Redional",
    },
    {
      id: 2,
      src: require("../../assets/p_crosta_castanha.jpg"),
      caption: "Peixe na Crosta da Castanha",
    },
    {
      id: 3,
      src: require("../../assets/tucuju.jpg"),
      caption: "Mistura tucuju",
    },
    {
      id: 4,
      src: require("../../assets/camarao_no_bafo.jpg"),
      caption: "Camarão no bafo",
    },
    { id: 5, src: require("../../assets/calderada.jpg"), caption: "Calderada" },
    {
      id: 6,
      src: require("../../assets/isca_de_file.jpg"),
      caption: "Isca de file",
    },
    {
      id: 7,
      src: require("../../assets/peixe_a_delicia.jpg"),
      caption: "Peixe a delicia",
    },
    {
      id: 8,
      src: require("../../assets/peixe_ao_molho_camarao_regional.jpg"),
      caption: "Peixe ao molho de camarão",
    },
    { id: 9, src: require("../../assets/pirao.jpg"), caption: "Pirão" },
    // ...
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

export default SlidesPrincipal;
