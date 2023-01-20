/* eslint-disable react/jsx-no-undef */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "../src/css/index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.render(
  <React.StrictMode>
    <Analytics />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(sendToVercelAnalytics);
