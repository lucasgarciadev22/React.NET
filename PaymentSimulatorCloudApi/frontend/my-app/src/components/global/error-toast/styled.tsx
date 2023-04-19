import styled from "styled-components";
import { Toast } from "react-bootstrap";

export const Container = styled(Toast)`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 99999;
  min-width: 300px;
  max-width: 400px;
  border-radius: 16px;
  overflow: hidden;
  `;

export const Header = styled(Toast.Header)`
  background-color: #dc3545;
  color: #fff;
  `;

export const Body = styled(Toast.Body)`
  background-color: #fff;
  color: #000;
`;

