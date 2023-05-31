/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import logo from "../../assets/saimo.png";
const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <p>Copyrights © 2023 SAIMO </p>
      <div style={{ width: 10 }} />
      <img src={logo} width={40} height={40} style={{ borderRadius: 50 }} />
    </div>
  );
};

export default Footer;
