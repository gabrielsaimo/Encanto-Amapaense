import React, { Suspense } from "react";
import { Spin } from "antd";
import SlidesPrincipal from "../modules/SlidePrincipal";
import SlidesSobemesas from "../modules/SlideSobremesas";
import SlidesBebidas from "../modules/SlideBebidas";
import Destaque from "./SlideDestaque";

const SlideRenderer = ({ index }) => {
  if (index === 0) {
    return (
      <Suspense fallback={<Spin />}>
        <SlidesPrincipal />
        <Destaque />
      </Suspense>
    );
  } else if (index === 11) {
    return (
      <Suspense fallback={<Spin />}>
        <SlidesSobemesas />
      </Suspense>
    );
  } else if (index === 15) {
    return (
      <Suspense fallback={<Spin />}>
        <SlidesBebidas />
      </Suspense>
    );
  }
  return null;
};

export default SlideRenderer;
