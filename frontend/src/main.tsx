import React from "react";
import App from "./app";
import ReactDOM from "react-dom/client";
import AuthProvider from "./contexts/AuthProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode >,
)

