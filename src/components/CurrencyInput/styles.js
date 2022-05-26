import styled from "styled-components";

export const StyledInput = styled.input`
  height: 32px;
  width: 210px;
  border: none;
  border-radius: 0px 8px 8px 0px;
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.text};
  &:focus {
    outline: none;
  }
`;

