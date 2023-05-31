/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import "../../css/Slide.css";
import { service, storage } from "../../services/firebase.ws";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const SlidesPrincipal = () => {
  const [files, setFiles] = useState([]);
  const [ordem, setOrdem] = useState([]);
  const db = getFirestore(service);
  const colletionRef = collection(db, "SlidePrincipal");

  useEffect(() => {
    if (files.length === 0) {
      loadImages();
    }
    if (ordem.length === 0) {
      getCardapio();
    }
  }, []);
  const getCardapio = async () => {
    const cardapioCollection = await getDocs(colletionRef);
    setOrdem(
      cardapioCollection.docs
        .map((doc) => doc.data())
        .sort((a, b) => a.id - b.id)
    );
  };
  const loadImages = async () => {
    const urls = await fetchImages();
    setFiles(urls);
  };
  const fetchImages = async () => {
    let result = await storage.ref().child("SlidePrincipal/").listAll();
    let urlPromises = result.items.map((imageRef) => imageRef.getDownloadURL());

    return Promise.all(urlPromises);
  };
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
            <div className="text-center">{ordem[index]?.name}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlidesPrincipal;
