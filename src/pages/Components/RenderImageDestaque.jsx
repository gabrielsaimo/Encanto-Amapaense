import React, { lazy, Suspense } from "react";
import { Carousel, Image, Spin } from "antd";
import "../../css/Collapse.css";
import LazyLoad from "react-lazyload";
const LazyLoadedImage = lazy(() =>
  import("antd").then((module) => ({ default: module.Image }))
);

const RenderImageDestaque = (img, index, id) =>
  img[0].idreq === id ? (
    <div className="img" key={index} style={{ zIndex: 5 }}>
      <LazyLoad key={index} height={200} offset={100}>
        <Image.PreviewGroup>
          <Carousel
            autoplay={true}
            autoplaySpeed={2000}
            showArrows={true}
            Swiping={true}
            draggable={true}
            effect="fade"
            dotPosition="bottom"
            style={{
              width: 200,
              maxWidth: 300,
              minWidth: "100px",
              color: "#fff",
            }}
          >
            {img
              .filter((img1) => img1.idreq && img1.idreq === id)
              .map((img1, index) => (
                <Suspense key={index} fallback={<Spin />}>
                  <div style={{ width: 200, maxWidth: 300 }}>
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
        </Image.PreviewGroup>
      </LazyLoad>
    </div>
  ) : null;

export default RenderImageDestaque;
