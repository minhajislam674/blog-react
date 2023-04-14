import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Typography, TextField, Button, Box } from "@mui/material";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const register = async (e: any) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
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
        onSubmit={register}
      >
        <Typography variant="h3">Register</Typography>
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
          autoComplete="new-password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          id="outlined-confirm-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          variant="outlined"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <Button variant="contained" type="submit">
          Register
        </Button>
        <Typography>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </>
  );
};

export default SignUpPage;
