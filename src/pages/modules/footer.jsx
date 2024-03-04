/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import logo from "../../assets/saimo.webp";
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
      <p>Copyrights © 2024 SAIMO </p>
      <div style={{ width: 10 }} />
      <img src={logo} alt="img" width={40} height={40} style={{ borderRadius: 50 }} />
    </div>
  );
};

export default Footer;
