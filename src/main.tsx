import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./contexts/ArticleContext";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDyXK5ZJyVnSkEfqo1810qzXsm2rNPaVys",
  authDomain: "my-blog-2eb4c.firebaseapp.com",
  projectId: "my-blog-2eb4c",
  storageBucket: "my-blog-2eb4c.appspot.com",
  messagingSenderId: "353795877438",
  appId: "1:353795877438:web:6c937c94e59e2c402bbf6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
