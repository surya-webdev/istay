import { useState } from "react";
import { useAuth } from "./useAuth";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("surya@futexx.com");
  const [password, setPassword] = useState("1552003");
  const { isAuth, isAuthLoading } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    isAuth(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isAuthLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isAuthLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button variations="primary" sizes="large" disabled={isAuthLoading}>
          {isAuthLoading ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
