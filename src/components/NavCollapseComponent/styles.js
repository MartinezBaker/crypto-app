import styled from "styled-components";

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
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: none;
`;

export const StyledCollapsedThemeButton = styled.button`
  cursor: pointer;
  background: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.text};
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
`;
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

export const StyledNavChild = styled.div`
  display: flex;
`;