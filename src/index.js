/* eslint-disable react/jsx-no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../src/Routes/Rotas";
import ReactDOM from "react-dom/client";
import "../src/css/index.css";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { Analytics } from "@vercel/analytics/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Analytics />
    <Routes />
  </BrowserRouter>
);

reportWebVitals(sendToVercelAnalytics);
