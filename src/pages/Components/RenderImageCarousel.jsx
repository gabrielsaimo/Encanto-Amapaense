import React, { lazy, Suspense } from "react";
import { Carousel, Spin } from "antd";
import "../../css/Collapse.css";
import LazyLoad from "react-lazyload";
const LazyLoadedImage = lazy(() =>
  import("antd").then((module) => ({ default: module.Image }))
);

const RenderImageCarousel = (img, index, id) =>
  img[0].idreq === id && (
    <div className="img" key={index} style={{ zIndex: 5 }}>
      <LazyLoad key={index} height={200} offset={100}>
        <Carousel
          autoplay={true}
          autoplaySpeed={2000}
          showArrows={true}
          Swiping={true}
          draggable={true}
          effect="fade"
          dotPosition="bottom"
          style={{
            width: "45vw",
            maxWidth: 300,
            minWidth: "100px",
            color: "#fff",
          }}
        >
          {img
            .filter((img1) => img1.idreq && img1.idreq === id)
            .map((img1, index) => (
              <Suspense key={index} fallback={<Spin />}>
                <div style={{ width: "45vw", maxWidth: 300 }}>
                  <LazyLoadedImage
                    src={atob(img1.imagem)}
                    key={index}
                    style={{
                      borderRadius: 10,
                      color: "#fff",
                      minWidth: "100px",
                      minHeight: 300,
                    }}
                    alt="img"
                    objectFit="cover"
                    width={"100%"}
                    loading="lazy"
                  />
                </div>
              </Suspense>
            ))}
        </Carousel>
      </LazyLoad>
    </div>
  );

export default RenderImageCarousel;
