import styled from "styled-components";

export const AppBody = styled.div`
  border: 1px solid ${({ theme }) => theme.app};
  background: ${({ theme }) => theme.app};
  margin: auto;
  max-width: 1200px;
`;

export const StyledNav = styled.nav`
  display: flex;
  margin: 10px 0px;
`

export const StyledNavChild = styled.div`
  width: 50%;
  display: flex;
`

export const StyledButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px;
  width: 45px;
  background: ${({theme}) => theme.button};
  &:hover {
    cursor: pointer;
  }
`;

export const SVGContainer = styled.div`
  width: 23px;
  margin: auto;
  filter: ${({theme}) => theme.svg};
`