import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./containers/Router";
import { UserProvider } from "./context/User";

const App = () => (
  <UserProvider>
    <Router />
    <ToastContainer theme="colored" position="bottom-right" />
  </UserProvider>
);

export default App;
