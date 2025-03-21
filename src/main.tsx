import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./src/routes";
import "./src/styles/global.css"; // Add global styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
