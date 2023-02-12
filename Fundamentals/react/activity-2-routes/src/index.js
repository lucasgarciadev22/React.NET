import "./index.css";
import App from "./App.js";
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/litera/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "./components/Menu";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Menu />
    <div className="container">
      <App />
    </div>
  </Router>
);
