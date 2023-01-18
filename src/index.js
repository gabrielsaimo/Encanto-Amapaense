import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
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
