import { Container } from "react-bootstrap";
import styled from "styled-components";

export const LogTile = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LogTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

export const LogDescription = styled.p`
  margin: 0;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
