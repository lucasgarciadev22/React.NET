import { Button } from "react-bootstrap";
import styled from "styled-components";

export const GlobalButton = styled(Button)`
  &&& {
    padding: 8px;
    border-radius: 8px;
    margin: 16px;
    cursor: pointer;
    font-size:16px;
    background-color: ${(props) =>
      props.variant === "primary" ? "transparent" : "transparent"};
    color: ${(props) => (props.variant === "primary" ? "#007bff" : "#dc3545")};
    border-color: ${(props) =>
      props.variant === "primary" ? "#007bff" : "#dc3545"};
  }

  &&&:hover {
    background-color: ${(props) =>
      props.variant === "primary" ? "#007bff" : "#dc3545"};
    color: #fff;
  }
`;
