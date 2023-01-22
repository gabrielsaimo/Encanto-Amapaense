import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import "../../css/Slide.css";
import { storage } from "../../services/firebase.ws";
const SlidesSobemesas = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.ref().child("SlideSecundario/").listAll();
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
    { id: 1, caption: "Musse" },
    { id: 2, caption: "Pudim" },
  ];

  return (
    <div id={"part-11"} style={{ margin: 5 }}>
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

export default SlidesSobemesas;
