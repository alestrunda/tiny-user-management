import { generateID } from "../helpers";
import { User, UserData } from "../types";

const RESPONSE_DELAY = 1000; //ms

const sampleUsers: User[] = [
  { email: "test@test.com", id: "10", firstName: "John", lastName: "Doe" },
  { email: "email@email.com", id: "11", firstName: "John", lastName: "Smith" },
  { email: "test@email.com", id: "12", firstName: "John", lastName: "Newman" },
];

const api = {
  createUser: (data: UserData): Promise<User> => {
    //TODO: send a real request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: generateID(),
          ...data,
        });
      }, RESPONSE_DELAY);
    });
  },

  deleteUser: (id: string): Promise<string> => {
    //TODO: send a real request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Ok");
      }, RESPONSE_DELAY);
    });
  },

  editUser: (data: UserData): Promise<string> => {
    //TODO: send a real request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Ok");
      }, RESPONSE_DELAY);
    });
  },

  loadUsers: (): Promise<User[]> => {
    //TODO: send a real request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleUsers);
      }, RESPONSE_DELAY);
    });
  },

  logIn: (email: string, password: string): Promise<User> => {
    //TODO: send a real request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = sampleUsers.find((user: User) => user.email === email);
        if (!user) reject("Email or password is not correct");
        else resolve(user);
      }, RESPONSE_DELAY);
    });
  },
};

export default api;
