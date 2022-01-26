import React from "react";
import RecipeCard from "../components/RecipeCard";
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  return (
    <div>
      <RecipeCard />
      <LoginButton />
      <LogoutButton />
      {isAuthenticated && (
        <div>
          <p>isAuthenticated</p>
          {console.log('user', user)}
        </div>
      )}
    </div>
  );
};

export default Home;
