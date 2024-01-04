import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {theme} from './utils/themeProvider.js'
import {  ThemeProvider } from '@mui/material';

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
