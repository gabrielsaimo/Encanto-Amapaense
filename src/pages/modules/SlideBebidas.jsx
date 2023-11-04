/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import "../../css/Slide.css";
import { storage } from "../../services/firebase.ws";
const SlidesBebidas = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (files.length === 0) {
      loadImages();
    }
  }, []);
  const fetchImages = async () => {
    let result = await storage.ref().child("SlideTerciario/").listAll();
    let urlPromises = result.items.map((imageRef) => imageRef.getDownloadURL());

    return Promise.all(urlPromises);
  };

  const loadImages = async () => {
    const urls = await fetchImages();
    setFiles(urls);
  };

  return (
    <div id={"part-12"} style={{ margin: 5 }}>
      <Carousel showArrows={true} autoplay={true} autoplaySpeed={2000}>
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

export default SlidesBebidas;
