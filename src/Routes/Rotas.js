import React from "react";
import { Routes, Route } from "react-router-dom";

import App from "../pages/App";
import Garçom from "../pages/modules/Garçom";
import Cozinha from "../pages/modules/Cozinha";
import Bar from "../pages/modules/BarMan";
import MenuDashboard from "../pages/modules/MenuDasboar";

export default function Rotas() {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/Dashboard/:idCompany?" element={<MenuDashboard />} />
      <Route path="/Garçom/:idCompany?" element={<Garçom />} />
      <Route path="/Cardapio/:idCompany?" element={<App />} />
      <Route parh="*">"404 - Not Found"</Route>
      <Route path="/Cozinha/:idCompany?" element={<Cozinha />}>
        "Cozinha"
      </Route>
      <Route path="/Bar" element={<Bar />}>
        "Bar"
      </Route>
    </Routes>
  );
}
