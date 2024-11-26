import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; 
import store from "./store"; 
import WeatherApp from "./WeatherApp"; 

ReactDOM.render(
  <Provider store={store}>
    <WeatherApp />
  </Provider>,
  document.getElementById("root")
);
