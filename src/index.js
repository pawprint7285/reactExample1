import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App";
import store from "./app/configureStore";
import { Provider } from "react-redux";
// import "@patternfly/patternfly/patternfly.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@patternfly/react-core/dist/styles/base.css";
// import "@patternfly/patternfly/patternfly.css";
// import "./index.css";

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
