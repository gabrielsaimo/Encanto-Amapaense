import React from "react";
import { Routes, Route } from "react-router-dom";

import App from "../pages/App";
import Config from "../pages/Configs";

export default function Rotas() {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/Dashboard" element={<Config />} />
    </Routes>
  );
}
