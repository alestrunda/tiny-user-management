import { useContext } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";

import { UserContext } from "../context/User";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Users from "../pages/Users";
import { START_PAGE_AFTER_LOGIN } from "../settings";

interface CustomRouteProps extends RouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children, ...rest }: CustomRouteProps) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const PublicOnlyRoute = ({ children, ...rest }: CustomRouteProps) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: START_PAGE_AFTER_LOGIN,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const Router = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/users">
        <Users />
      </PrivateRoute>
      <PublicOnlyRoute path="/sign-up">
        <SignUp />
      </PublicOnlyRoute>
      <PublicOnlyRoute exact path={["/login", "/"]}>
        <SignIn />
      </PublicOnlyRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
