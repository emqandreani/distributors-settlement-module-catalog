import { Button } from "@architecture-it/stylesystem";
import { Typography } from "@mui/material";
import React from "react";

import styles from "../styles/Login.module.scss";

export default function Login() {
  const [authenticated, setAuthenticated] = React.useState(false);

  const handleClick = () => {
    setAuthenticated((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h1">{authenticated ? "Welcome" : "Please sign in"}</Typography>
      <Button text={authenticated ? "logout" : "login"} variant="contained" onClick={handleClick} />
    </div>
  );
}
