import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Typography, TextField, Box, Button } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async (e: any) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/articles");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > :not(style)": { m: 1, width: "50%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={login}
      >
        <Typography variant="h3">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>

        <Typography>
          Don't have an account? <Link to="/signup">Register</Link>
        </Typography>
      </Box>
    </>
  );
};

export default LoginPage;
