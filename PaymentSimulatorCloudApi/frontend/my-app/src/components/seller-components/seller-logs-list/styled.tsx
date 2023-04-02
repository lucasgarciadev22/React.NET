import styled from "styled-components";

export const LogList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & > * + * {
    margin-top: 16px;
  }
`;
