import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";

// la extensión de Redux DevTools solo se active en el entorno de desarrollo y no en producción
const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
