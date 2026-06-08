import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import counterReducer from "./counterSlice";
import topicReducer from "./topicSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    topic: topicReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
