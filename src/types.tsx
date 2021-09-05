export interface LinkConfig {
  protected: boolean;
  title: string;
  to: string;
}

export interface User {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
