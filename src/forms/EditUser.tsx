import { useState } from "react";
import { toast } from "react-toastify";

import api from "../api";
import { User, UserData } from "../types";
import { defaultUserData } from "./CreateUser";

interface Props {
  onCancel: () => void;
  onClose: () => void;
  onEdited: (user: User) => void;
  user: User;
}

const EditUser = ({ onCancel, onClose, onEdited, user }: Props) => {
  const [userData, setUserData] = useState<UserData>({
    ...defaultUserData,
    ...user,
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .editUser(userData)
      .then(() => {
        toast.success("User was updated");
        onEdited({ ...user, ...userData });
        onClose();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        onChange={handleInputChange}
        type="text"
        value={userData.firstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        onChange={handleInputChange}
        type="text"
        value={userData.lastName}
      />
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        onChange={handleInputChange}
        type="text"
        value={userData.email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        onChange={handleInputChange}
        type="password"
        value={userData.password}
      />
      <div className="grid">
        <div className="grid__col-2">
          <button
            className="button button--outline"
            disabled={loading}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
        <div className="grid__col-2">
          <button className="button" disabled={loading} type="submit">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUser;
