import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@repo/configs/axios.config";
import "@repo/ui/assets/global.css";

const root = document.getElementById("root-ge") as HTMLDivElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
