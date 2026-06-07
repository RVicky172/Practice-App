import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { TreeInspector } from "react-tree-inspector";

import { store } from "./store";

import App from "./App";

import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
      {__APP_ENV__ !== "production" && (
        <TreeInspector buttonPosition="bottom-right" />
      )}
    </Provider>
  </StrictMode>,
);
