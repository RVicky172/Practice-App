import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import topicReducer from "./topicSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    topic: topicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
