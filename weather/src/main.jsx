import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import WeatherApp from "./WeatherApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <WeatherApp />
  </Provider>
);
