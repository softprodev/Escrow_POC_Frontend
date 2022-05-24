import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";
import { Provider } from 'react-redux'
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DAppProvider config={{}}>
        <App />
      </DAppProvider>
    </Provider>    
  </React.StrictMode>,
  document.getElementById("root")
);
