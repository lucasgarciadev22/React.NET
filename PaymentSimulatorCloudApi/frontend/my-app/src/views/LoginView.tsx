import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../components/login-components/login-form/index";
import { GlobalWrapper } from "../components/global/GlobalComponents";
import { IUser, UserType } from "./../models/login-models/IUser";

const LoginView: React.FC = () => {
  const handleSubmit = (newUser: IUser) => {
    setUser({
      ...user,
      userName: newUser.userName,
      userPassword: newUser.userPassword,
    });
    // faça algo com as credenciais do usuário, como enviar para a API de autenticação
    console.log(`Username: ${user?.userName}, Password: ${user?.userPassword}`);
  };
  const initialUser: IUser = {
    accesLevel: UserType.User,
    userName: "",
    userPassword: "",
  };
  const [user, setUser] = useState<IUser>(initialUser);
  return (
    <GlobalWrapper>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Login</h1>
          <LoginForm onSubmit={handleSubmit} user={initialUser} />
        </Col>
      </Row>
    </GlobalWrapper>
  );
};

export default LoginView;
