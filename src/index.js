/* eslint-disable react/jsx-no-undef */
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  (window.location.href =
    "https://menu-digital.vercel.app/home/2/Encanto%20Amapaense")
);

reportWebVitals(sendToVercelAnalytics);

/*import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../src/Routes/Rotas";
import ReactDOM from "react-dom/client";
import "../src/css/index.css";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Analytics />
    <Routes />
    <SpeedInsights />
  </BrowserRouter>
);

reportWebVitals(sendToVercelAnalytics);*/
