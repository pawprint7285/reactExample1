import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

// const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  // initialState,
  applyMiddleware(...middleware)
);

export default store;

// export default function configureStore(initialState) {
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

//   return createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
//   );
// }
