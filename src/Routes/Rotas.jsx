import React from "react";
import { Routes, Route } from "react-router-dom";

import App from "../pages/App";
import Garçom from "../pages/modules/Garçom";
import Cozinha from "../pages/modules/Cozinha";
import Bar from "../pages/modules/BarMan";
import MenuDashboard from "../pages/modules/MenuDasboar";
import AppDelivery from "../pages/AppDelivery";
import Home from "../pages/modules/Home";
import StatusPedido from "../pages/modules/StatusPedio";
import Error404 from "../pages/modules/Error404";
import Reserva from "../pages/modules/Reserva";
export default function Rotas() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/Dashboard" element={<MenuDashboard />} />
      <Route path="/Garçom" element={<Garçom />} />
      <Route path="/Cardapio" element={<App />} />
      <Route path="/*" element={<Error404 />}></Route>
      <Route path="*" element={<Error404 />}></Route>
      <Route path="/Cozinha" element={<Cozinha />} />
      <Route path="/Delivery" element={<AppDelivery />} />
      <Route path="/Reserva" element={<Reserva />} />
      <Route path="/Bar" element={<Bar />} />
      <Route path="/MeuPedido/:idpedido" element={<StatusPedido />} />
    </Routes>
  );
}
