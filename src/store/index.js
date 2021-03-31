// Lib
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

// 自寫
import reducer from "./reducer";

// 處理devtools跟redux-thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

// 處理redux-persist
const store = createStore(reducer, enhancer);
const persistor = persistStore(store);

export { store, persistor };
