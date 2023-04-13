import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
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
      <h1>Login</h1>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="error"> {error} </p>}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error"> {error} </p>}
      <button onClick={login}>Login</button>

      <p>
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </>
  );
};

export default LoginPage;
