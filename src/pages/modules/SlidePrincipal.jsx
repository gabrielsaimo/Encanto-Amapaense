import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import "../../css/Slide.css";
import { storage } from "../../services/firebase.ws";

const SlidesPrincipal = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.ref().child("SlidePrincipal/").listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setFiles(urls);
    };
    loadImages();
  }, []);

  const Slide = [
    {
      id: 1,
      caption: "Encanto Redional",
    },
    {
      id: 2,
      caption: "Peixe na Crosta da Castanha",
    },
    {
      id: 3,
      caption: "Mistura tucuju",
    },
    {
      id: 4,
      caption: "Camarão no bafo",
    },
    {
      id: 6,
      caption: "Isca de file",
    },
    {
      id: 7,
      caption: "Peixe a delicia",
    },
    {
      id: 8,
      caption: "Peixe ao molho de camarão",
    },
    { id: 9, caption: "Pirão" },
    // ...
  ];
  return (
    <div style={{ margin: 5 }}>
      <Carousel showArrows={true} autoplay={true}>
        {files.map((item, index) => (
          <div key={index}>
            <Image
              src={item}
              height={600}
              alt={item.caption}
              className="img-fluid"
            />
            <div className="text-center">{item.caption}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlidesPrincipal;
