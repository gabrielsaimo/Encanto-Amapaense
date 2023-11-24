import React from "react";
import { Routes, Route } from "react-router-dom";

import App from "../pages/App";
import Config from "../pages/Configs";
import Garçom from "../pages/modules/Garçom";
import Cozinha from "../pages/modules/Cozinha";
import Bar from "../pages/modules/BarMan";
import MenuDashboard from "../pages/modules/MenuDasboar";

export default function Rotas() {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/Dashboard" element={<Config />} />
      <Route path="/Garçom" element={<Garçom />} />
      <Route path="/MenuDashboard" element={<MenuDashboard />} />
      <Route parh="*">"404 - Not Found"</Route>
      <Route path="/Cozinha" element={<Cozinha />}>
        "Cozinha"
      </Route>
      <Route path="/Bar" element={<Bar />}>
        "Bar"
      </Route>
    </Routes>
  );
}
