import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
      domain="dev-bo9jvh8o.us.auth0.com"
      clientId="8hNRqixsFVvttRmhsrKBpCe6kVnJ51Sa"
      redirectUri={window.location.origin}
    >
      <Router>
        <Routes />
      </Router>
    </Auth0Provider>
  );
}

export default App;
