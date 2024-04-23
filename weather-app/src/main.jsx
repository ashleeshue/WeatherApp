import React from "react";
import ReactDOM from "react-dom";
import WeatherApp from "./Components/WeatherApp";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>,
  document.getElementById("root")
);
