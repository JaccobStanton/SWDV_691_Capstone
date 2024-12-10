import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { AppProvider } from "./context/AppContext.jsx"; // Import the AppProvider
import store from "../src/store/index.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        {" "}
        {/* Wrap App with AppProvider */}
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>
);
