import React from "react";
import { Card } from "react-bootstrap";
import styled from 'styled-components';

const StyledCard = styled(Card)`
  /* Add your styles here */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 16px;
  width: 300px;
  height: 400px;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 0;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
`;

export default StyledCard;
