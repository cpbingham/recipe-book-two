import React from "react";
import { Switch, Route } from "react-router-dom";

// import NavBar from "./components/NavBar";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
