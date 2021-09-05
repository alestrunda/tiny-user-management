import { useState } from "react";
import { toast } from "react-toastify";

import api from "../api";
import { User, UserData } from "../types";

export const defaultUserData: UserData = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

interface Props {
  onCreated: (user: User) => void;
}

const CreateUser = ({ onCreated }: Props) => {
  const [userData, setUserData] = useState(defaultUserData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .createUser(userData)
      .then((user: User) => {
        toast.success("User was created");
        resetForm();
        onCreated(user);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetForm = () => {
    setUserData(defaultUserData);
  };

  return (
    <form className="grid" onSubmit={handleSubmit}>
      <div className="grid__col-3">
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          onChange={handleInputChange}
          required
          type="text"
          value={userData.firstName}
        />
      </div>
      <div className="grid__col-3">
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          onChange={handleInputChange}
          required
          type="text"
          value={userData.lastName}
        />
      </div>
      <div className="grid__col-3">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          onChange={handleInputChange}
          required
          type="email"
          value={userData.email}
        />
      </div>
      <div className="grid__col-3">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          minLength={7}
          onChange={handleInputChange}
          required
          type="password"
          value={userData.password}
        />
      </div>
      <div className="grid__col-3">
        <button className="button mb30" disabled={loading} type="submit">
          Create user
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
