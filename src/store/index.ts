import { configureStore } from "@reduxjs/toolkit";
import reducer from "./rootReducer";

const middlewares = []; // middleware

const store = configureStore({
  reducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export default store;
