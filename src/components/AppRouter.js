import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import NotFound from "../views/404";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/not-found" component={NotFound} />
      </div>
    </Router>
  );
};

export default AppRouter;
