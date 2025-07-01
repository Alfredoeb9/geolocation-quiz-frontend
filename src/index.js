import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import persistStore from "redux-persist/es/persistStore";
import { store, persistor } from "./app/store";
import "./index.css";
import App from "./App";

const PersistLoading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'var(--mainBackground)',
    color: '#fff',
    fontSize: '18px'
  }}>
    Loading...
  </div>
);

// const persistor = persistStore(store);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<PersistLoading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
