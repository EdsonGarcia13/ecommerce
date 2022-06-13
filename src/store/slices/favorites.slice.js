import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    setFavorites: (state, action) => {
      return action.payload;
    }
  }
});

export const { setFavorites } = favoritesSlice.actions;



export const getFavorites = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
    .then((res) => dispatch(setFavorites(res?.data?.data.cart)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addToFavorites = (favorite) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
      favorite,
      getConfig()
    )
    .then(() => dispatch(getFavorites()))
    .finally(() => dispatch(setIsLoading(false)));
};

export default favoritesSlice.reducer;
