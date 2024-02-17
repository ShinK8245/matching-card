import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CardDataContextProvider } from "./context/CardDataContext";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CardDataContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CardDataContextProvider>
  </React.StrictMode>
);
