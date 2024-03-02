import React from "react";
import Marquee from "react-fast-marquee";
import { Alert } from "antd";
const BannerAlert = ({ type, message }) => (
  <Alert
    banner
    type={type}
    icon={false}
    message={
      <Marquee pauseOnHover gradient={false}>
        {message}
      </Marquee>
    }
  />
);
export default BannerAlert;
