import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    weatherData: null,
    forecastData: [],
    error: "",
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setForecastData: (state, action) => {
      state.forecastData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCity, setWeatherData, setForecastData, setError } =
  weatherSlice.actions;
export default weatherSlice.reducer;
