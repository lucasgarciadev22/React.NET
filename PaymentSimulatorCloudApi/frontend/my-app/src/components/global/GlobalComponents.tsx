import { Button, NavLink } from "react-bootstrap";
import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const GlobalButton = styled(Button)`
  &&& {
    padding: 8px;
    border-radius: 8px;
    margin: 16px;
    cursor: pointer;
    font-size: 16px;
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
export const GlobalWrapper = styled.div`
  margin: 16px;
  padding: 8px;
`;

export const GlobalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 8px;
`;

export const GlobalNavLink = styled(NavLink)`
  padding: 16px;
  text-decoration: none;
  color: #333;
`;
