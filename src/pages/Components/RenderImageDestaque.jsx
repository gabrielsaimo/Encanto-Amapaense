import React, { lazy, Suspense } from "react";
import { Carousel, Image, Spin } from "antd";
import "../../css/Collapse.css";
import LazyLoad from "react-lazyload";
const LazyLoadedImage = lazy(() =>
  import("antd").then((module) => ({ default: module.Image }))
);

const imageStyle = {
  borderRadius: "10px 10px 0px 0px",
  color: "#fff",
  minWidth: "100px",
  minHeight: 300,
};

const divStyle = {
  width: 200,
  maxWidth: 300,
};

const carouselStyle = {
  width: 200,
  maxWidth: 300,
  minWidth: "100px",
  color: "#fff",
};

const RenderImageDestaque = (img, index, id) =>
  img[0].idreq === id ? (
    <div className="img" style={{ zIndex: 5 }}>
      <LazyLoad height={200} offset={100}>
        <Image.PreviewGroup>
          <Carousel
            autoplay={true}
            autoplaySpeed={2000}
            showArrows={true}
            Swiping={true}
            draggable={true}
            effect="fade"
            dotPosition="bottom"
            style={carouselStyle}
          >
            {img
              .filter((img1) => img1.idreq && img1.idreq === id)
              .map((img1) => (
                <Suspense fallback={<Spin />}>
                  <div style={divStyle}>
                    <LazyLoadedImage
                      src={atob(img1.imagem)}
                      style={imageStyle}
                      alt="img"
                      objectFit="cover"
                      width={"100%"}
                      loading="lazy"
                    />
                  </div>
                </Suspense>
              ))}
          </Carousel>
        </Image.PreviewGroup>
      </LazyLoad>
    </div>
  ) : null;

export default RenderImageDestaque;
