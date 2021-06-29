import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { client } from "../utils/api-client";

const RecipeCard = () => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState(false);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  useEffect(() => {
    setStatus("loading");
    client("recipes").then(
      (responseData) => {
        setData(responseData);
        setStatus("success");
      },
      (errorData) => {
        setError(errorData);
        setStatus("error");
      }
    );
  }, [query, queried]);

  const handleClick = (event) => {
    event.preventDefault();
    setQueried(true);
  };

  isLoading && console.log("Loading...");
  isSuccess && console.log("data", data);

  return (
    <Card>
      <Typography>Blah blah</Typography>
      <Button onClick={handleClick}>Click Me!</Button>
      {isLoading && <CircularProgress />}
      {isError && <Typography>There was an error: {error.message}</Typography>}
      {isSuccess && <Typography>{data?.recipes[0].name}</Typography>}
    </Card>
  );
};

export default RecipeCard;
