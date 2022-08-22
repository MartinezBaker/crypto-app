import styled from "styled-components";

export const AppBody = styled.div`
  border: none;
  background: ${({ theme }) => theme.app};
  margin: auto;
  max-width: 1200px;
`;

export const StyledNav = styled.nav`
  display: flex;
  max-width: 1070px;
  margin: 20px auto 10px auto;
`;

export const StyledNavChild = styled.div`
  width: 50%;
  display: flex;
`

export const StyledButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 5px 10px 5px;
  width: 50px;
  background: ${({theme}) => theme.button};
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
  background: ${({ active, theme }) => active ? theme.button : theme.body};
  &:hover {
    cursor: pointer;
  }
  text-align: center;
  font-size: 19px;
`;

export const GlobalInfoContainer = styled.div`
  display: flex;
  border: none;
  background: ${({theme}) => theme.body};
  color: ${({theme}) => theme.text};
  font-size: 13px;
  width: 43%;
  margin: auto;
  justify-content: center;
  padding: 20px;
  border-radius: 0 0 25px 25px;
`

export const GlobalInfo = styled.div`
  margin-right: 15px;
`

export const StyledImg = styled.img`
  width: 13px;
  margin-right: 3px;
`