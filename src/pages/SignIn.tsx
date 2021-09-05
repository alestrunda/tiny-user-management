import { Link } from "react-router-dom";

import Page from "../components/Page";
import FormSignIn from "../forms/SignIn";

const SignIn = () => (
  <Page>
    <h1>Sign in</h1>
    <FormSignIn />
    <p className="text-center">
      Don’t have an account? <Link to="sign-up">Create an account</Link>
    </p>
  </Page>
);

export default SignIn;
