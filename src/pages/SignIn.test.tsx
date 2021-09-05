import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import SignIn from "./SignIn";

test("renders login form", async () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  expect(screen.getByLabelText("Email address")).toBeInTheDocument();
});

test("renders sign-up link", async () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  expect(screen.getByText(/Create an account/i).closest("a")).toHaveAttribute(
    "href",
    "/sign-up"
  );
});
