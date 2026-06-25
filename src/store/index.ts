import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import counterReducer from "./counterSlice";
import themeReducer from "./themeSlice";
import topicReducer from "./topicSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    topic: topicReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
