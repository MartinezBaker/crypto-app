import styled from "styled-components";
import { Link } from "react-router-dom";

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
  justify-content: space-between;
  padding: 0 50px 0 50px;
`;

export const StyledNavChild = styled.div`
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
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 13px;
  width: fit-content;
  margin: auto;
  justify-content: center;
  padding: 10px 0 10px 20px;
  border-radius: 0 0 25px 25px;
  @media (max-width: 276px) {
    display: none;
  }
`;

export const GlobalInfoOne = styled.div`
  margin-right: 25px;
  @media (max-width: 1300px){
    display: none;
  }
`

export const GlobalInfoTwo = styled.div`
  margin-right: 25px;
  @media (max-width: 999px) {
    display: none;
  }
`;

export const GlobalInfoThree = styled.div`
  margin-right: 25px;
`;

export const GlobalInfoFour = styled.div`
  margin-right: 25px;
`;

export const GlobalInfoFive = styled.div`
  margin-right: 25px;
  @media (max-width: 469px) {
    display: none;
  }
`;

export const StyledImgBC = styled.div`
  margin-right: 3px;
`

export const StyledImgEth = styled.div`
  margin-right: 3px;
  @media (max-width: 469px){
    display: none;
  }
`;

export const StyledSideBar = styled.div`
  position: absolute;
  z-index: 1;
  top: 47px;
  right: 20px;
  padding: 15px;
  background: ${({ theme }) => theme.button};
  overflow-x: hidden;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const StyledNavButton = styled.button`
  cursor: pointer;
  background: ${({theme}) => theme.body};
  color: ${({theme}) => theme.text};
  border: none;
`

export const StyledCollapsedThemeButton = styled.button`
  cursor: pointer;
  background: ${({ theme }) => theme.button};
  color: ${({theme}) => theme.text};
  border: none;
`;

export const StyledCollapsedNav = styled.nav`
  display: flex;
  padding: 5px 50px 5px 50px;
  justify-content: space-between;
  @media (max-width: 469px) {
    padding: 5px 20px 5px 20px;
  }
  @media (max-width: 276px) {
    padding: 5px 20px 0 20px;
  }
`;

export const NavSVGContainer = styled.div`
  width: 20px;
  margin-top: 5px;
  filter: ${({ theme }) => theme.svg};
  transform: rotate(180deg);
`;

export const StyledHR = styled.hr`
  width: 90%;
`
export const StyledCollapsedNavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  margin-bottom: 7px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;