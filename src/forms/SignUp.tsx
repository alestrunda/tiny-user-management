import React, { useContext, useState } from "react";

import api from "../api";
import Error from "../components/Error";
import { UserContext } from "../context/User";
import { defaultUserData } from "./CreateUser";

const SignUp = () => {
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState(defaultUserData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await api.createUser(data);
      setUser(user);
    } catch (error) {
      setError(typeof error === "string" ? error : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        onChange={handleInputChange}
        required
        type="text"
        value={data.firstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        onChange={handleInputChange}
        required
        type="text"
        value={data.lastName}
      />
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        onChange={handleInputChange}
        required
        type="email"
        value={data.email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        minLength={7}
        onChange={handleInputChange}
        required
        type="password"
        value={data.password}
      />
      <div className="m30"></div>
      <button className="button" disabled={loading} type="submit">
        Create an account
      </button>
      {error && <Error message={error} />}
    </form>
  );
};

export default SignUp;
