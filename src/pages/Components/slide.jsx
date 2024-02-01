import React, { Suspense } from "react";
import { Spin } from "antd";
import Destaque from "./SlideDestaque";

//const SlidesPrincipal = React.lazy(() => import("../modules/SlidePrincipal"));
const SlidesSobemesas = React.lazy(() => import("../modules/SlideSobremesas"));
const SlidesBebidas = React.lazy(() => import("../modules/SlideBebidas"));

const componentMap = {
  // 0: SlidesPrincipal,
  11: SlidesSobemesas,
  15: SlidesBebidas,
};

const SlideRenderer = ({ index }) => {
  const Component = componentMap[index];

  return (
    <Suspense fallback={<Spin />}>
      {Component && <Component />}
      {index === 0 && <Destaque />}
    </Suspense>
  );
};

export default SlideRenderer;
