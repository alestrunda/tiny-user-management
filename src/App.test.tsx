import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders sign in page", () => {
  render(<App />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Sign in"
  );
});
