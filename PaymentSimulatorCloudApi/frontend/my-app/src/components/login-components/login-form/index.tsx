import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ILoginFormProps } from "../../../models/login-models/ILoginComponentsProps";
import { GlobalButtonWrapper } from "../../global/GlobalComponents";
import { IUser } from "../../../models/login-models/IUser";

const LoginForm: React.FC<ILoginFormProps> = ({
  onSubmit,
  user,
}: ILoginFormProps) => {
  const [loginUser, setLoginUser] = useState<IUser>(user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isRegistered = false;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginUser({ ...loginUser, userName: username, userPassword: password });
    user = loginUser;
    onSubmit(loginUser);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <GlobalButtonWrapper>
        <Button variant="primary" type="submit">
          Enter
        </Button>
      </GlobalButtonWrapper>
    </Form>
  );
};

export default LoginForm;
