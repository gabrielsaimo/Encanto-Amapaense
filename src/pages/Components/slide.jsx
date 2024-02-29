import React, { Suspense } from "react";
import { Spin } from "antd";

//const SlidesPrincipal = React.lazy(() => import("../modules/SlidePrincipal"));
const SlidesSobemesas = React.lazy(() => import("../modules/SlideSobremesas"));
const SlidesBebidas = React.lazy(() => import("../modules/SlideBebidas"));
const Destaque = React.lazy(() => import("./SlideDestaque"));

const componentMap = {
  0: Destaque,
  11: SlidesSobemesas,
  15: SlidesBebidas,
};

const SlideRenderer = ({ index }) => {
  const Component = componentMap[index];

  return <Suspense fallback={<Spin />}>{Component && <Component />}</Suspense>;
};

export default SlideRenderer;
