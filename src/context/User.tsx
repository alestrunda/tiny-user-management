import React, { useState } from "react";

import { User } from "../types";

interface UserContextType {
  user?: User;
  setUser: (user?: User) => void;
}

export const UserContext = React.createContext<UserContextType>({
  setUser: () => undefined,
});

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
