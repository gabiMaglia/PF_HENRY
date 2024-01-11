import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";
import ReactDOM from "react-dom/client";
import { theme } from "./utils/themeProvider.js";
import App from "./App.jsx";
//FIREBASE
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASURE_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
