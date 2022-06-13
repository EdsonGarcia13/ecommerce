import { configureStore } from "@reduxjs/toolkit";
import isLoading from "./slices/isLoading.slice";
import products from "./slices/products.slice";
import favorites from "./slices/favorites.slice";

export default configureStore({
  reducer: {
    isLoading,
    products,
    favorites
  }
});
