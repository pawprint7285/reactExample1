import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

// const initialState = {};

const middleware = [thunk, reduxImmutableStateInvariant()];

const store = createStore(
  rootReducer,
  // initialState,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
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
