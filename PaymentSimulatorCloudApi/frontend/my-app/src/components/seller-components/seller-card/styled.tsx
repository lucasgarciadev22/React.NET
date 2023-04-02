import {Card, NavLink } from "react-bootstrap";
import styled from "styled-components";

export const CardMain = styled(Card)`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.295);
  padding: 16px;
  min-width: 300px;
`;

export const Header = styled(Card.Header)`
  color: #fff;
  background-color: #444444;
  font-size: 1.5rem;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
`;

export const Body = styled(Card.Body)`
  background-color: #fff;
  color: #444444;
  border-radius: 8px;
  margin: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 0;
`;

export const Title = styled.h3`
  padding: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0;
  color: #444444;
`;

export const Description = styled.p`
  color: #444444;
  font-size: 1rem;
  margin: 0;
`;

export const Highlight = styled.span`
  color: #fff;
  background-color: #444444;
  font-size: 1rem;
  margin: 8px;
  padding: 8px 14px;
  border-radius: 8px;
`;

export const StyledNavLink = styled(NavLink)`
padding:16px;
text-decoration: none;
color: #333;

&&&:hover {
  color: #007bff;
  text-decoration: none;
}

&&&.active {
  color: #007bff;
  font-weight: bold;
}
`;


