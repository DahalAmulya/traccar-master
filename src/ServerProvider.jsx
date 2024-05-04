import React, { useState } from "react";
import { Alert, IconButton, LinearProgress } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useDispatch, useSelector } from "react-redux";
import { useEffectAsync } from "./reactHelper";
import { sessionActions } from "./store";

const ServerProvider = ({ children }) => {
  const dispatch = useDispatch();

  const initialized = useSelector((state) => !!state.session.server);
  const [error, setError] = useState(null);

  useEffectAsync(async () => {
    if (!error) {
      try {
        const response = await fetch("http://108.181.186.122:8082/api/server"); // Ensure to use the full URL with 'http://' or 'https://'

        if (response.ok) {
          const jsonData = await response.json(); // Parse response body as JSON

          if (jsonData) {
            dispatch(sessionActions.updateServer(jsonData)); // Dispatch the JSON data to update Redux state
          } else {
            throw new Error("Failed to parse JSON data");
          }
        } else {
          const errorMessage = await response.text(); // Get error message from response body
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
          );
        }
      } catch (error) {
        setError(error.message); // Set error message in component state
      }
    }
  }, [error]);

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <IconButton
            color="inherit"
            size="small"
            onClick={() => setError(null)}
          >
            <ReplayIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {error}
      </Alert>
    );
  }
  if (!initialized) {
    return <LinearProgress />;
  }
  return children;
};

export default ServerProvider;
