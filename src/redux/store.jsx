import { configureStore } from "@reduxjs/toolkit";
import myTaskSlice from "../redux/slice/MyTaskSlice";

const store = configureStore({
  reducer: {
    myTask: myTaskSlice,
  },
});

export default store;