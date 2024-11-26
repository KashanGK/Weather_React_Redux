import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice"; // Ensure this path is correct

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
