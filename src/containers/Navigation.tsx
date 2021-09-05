import { useContext } from "react";

import NavigationComponent from "../components/Navigation";
import { UserContext } from "../context/User";
import { LinkConfig } from "../types";

const navLinks: LinkConfig[] = [
  {
    protected: true,
    title: "Users",
    to: "users",
  },
];

const Navigation = () => {
  const { setUser, user } = useContext(UserContext);
  const username = user && `${user.firstName} ${user.lastName}`;

  const handleLogOut = () => {
    setUser(undefined);
  };

  return (
    <NavigationComponent
      links={navLinks}
      loggedIn={!!user}
      onLogOut={handleLogOut}
      username={username}
    />
  );
};

export default Navigation;
