import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { MetaMaskProvider } from "metamask-react";

import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </CookiesProvider>
  </React.StrictMode>
);
