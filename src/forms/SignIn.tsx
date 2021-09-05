import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../api";
import Error from "../components/Error";
import { UserContext } from "../context/User";
import { START_PAGE_AFTER_LOGIN } from "../settings";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await api.logIn(email, password);
      setUser(user);
      history.push(START_PAGE_AFTER_LOGIN);
    } catch (error) {
      setError(typeof error === "string" ? error : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        onChange={handleEmailChange}
        required
        type="email"
        value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={handlePasswordChange}
        required
        type="password"
        value={password}
      />
      <div className="m100"></div>
      <button className="button" disabled={loading} type="submit">
        Sign in
      </button>
      {error && <Error message={error} />}
    </form>
  );
};

export default SignUp;
