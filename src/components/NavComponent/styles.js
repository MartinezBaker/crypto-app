import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  max-width: 1070px;
  margin: 20px auto 10px auto;
  justify-content: space-between;
  padding: 0 50px 0 50px;
`;

export const StyledNavChild = styled.div`
  display: flex;
`;

export const StyledButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 5px 10px 5px;
  width: 50px;
  background: ${({ theme }) => theme.button};
  &:hover {
    cursor: pointer;
  }
`;

export const SVGContainer = styled.div`
  width: 27px;
  margin: auto;
  filter: ${({ theme }) => theme.svg};
  transform: rotate(180deg);
`;

export const StyledLinkContainer = styled.div`
  border: none;
  border-radius: 10px;
  padding: 12px 5px;
  width: 100px;
  background: ${({ active, theme }) => (active ? theme.button : theme.body)};
  &:hover {
    cursor: pointer;
  }
  text-align: center;
  font-size: 19px;
`;
