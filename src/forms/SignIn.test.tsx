import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import api from "../api";
import SignIn from "./SignIn";

test("renders inputs", async () => {
  render(<SignIn />);

  expect(screen.getByLabelText("Email address")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
});

test("can type email address", async () => {
  render(<SignIn />);

  const emailInput = screen.getByLabelText("Email address") as HTMLInputElement;

  act(() => {
    fireEvent.change(emailInput, { target: { value: "my@email.com" } });
  });

  expect(emailInput.value).toBe("my@email.com");
});

test("can submit the form", async () => {
  render(<SignIn />);

  const loginHandler = jest.spyOn(api, "logIn");
  const emailInput = screen.getByLabelText("Email address") as HTMLInputElement;
  const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
  const submitButton = screen.getByRole("button", { name: /Sign In/i });

  act(() => {
    fireEvent.change(emailInput, { target: { value: "my@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "abc1234" } });
  });
  fireEvent.click(submitButton);

  expect(loginHandler).toHaveBeenCalledWith("my@email.com", "abc1234");
});

test("when incorrect credentials then shows error message", async () => {
  render(<SignIn />);

  const loginHandler = jest.spyOn(api, "logIn");
  loginHandler.mockRejectedValue("Credentials are incorrect");

  const emailInput = screen.getByLabelText("Email address") as HTMLInputElement;
  const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
  const submitButton = screen.getByRole("button", { name: /Sign In/i });

  act(() => {
    fireEvent.change(emailInput, { target: { value: "my@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "abc1234" } });
    fireEvent.click(submitButton);
  });

  await waitFor(() =>
    expect(screen.getByText("Credentials are incorrect")).toBeInTheDocument()
  );
});
