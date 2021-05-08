import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainPage from "./containers/index";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
