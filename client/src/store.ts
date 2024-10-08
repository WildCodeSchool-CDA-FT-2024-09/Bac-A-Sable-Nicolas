import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./features/repo/repoSlice";

const store = configureStore({
  reducer: {
    repo: repoReducer
  }
});

export default store;