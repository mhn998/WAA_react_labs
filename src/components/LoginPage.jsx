import { useState, useContext } from "react";
import { loginService } from "../services/auth.service";
import Dashboard from "../views/Dashboard";
import userContext from "../authContext";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, setUser } = useContext(userContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const success = await loginService({
        email,
        password,
      });

      if (!success) {

      } else {
        // setIsLoggedIn(true);
        setUser({loggedIn: true });

        window.location.href = "/dashboard";
      }
    } catch (e) {
      console.log(e);
    }
  }

  return user?.isLoggedIn ? (
    <Dashboard />
  ) : (
    <form onSubmit={handleLogin} method="post">
      <label htmlFor="email">Email</label>
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        name="email"
        id="email"
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        name="password"
        id="password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
