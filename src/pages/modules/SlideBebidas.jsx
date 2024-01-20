/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Carousel } from "antd";
import "../../css/Slide.css";
import { storage } from "../../services/firebase.ws";

const LazyLoadedImage = lazy(() =>
  import("antd").then((module) => ({ default: module.Image }))
);

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
      <Suspense fallback={<div>Carregando...</div>}>
        <Carousel
          showArrows={true}
          autoplay={true}
          autoplaySpeed={2000}
          effect="fade"
          dotPosition="bottom"
        >
          {files.map((item, index) => (
            <div key={index}>
              <LazyLoadedImage
                src={item}
                height={600}
                alt={item.caption}
                className="img-fluid"
                loading="lazy"
              />
              <div className="text-center">{item.caption}</div>
            </div>
          ))}
        </Carousel>
      </Suspense>
    </div>
  );
};

export default SlidesBebidas;
