import styled from "styled-components";

export const FullBody = styled.div`
  background-color: ${({ darkMode }) => {
    if (darkMode) {
      return "rgb(25, 27, 31)";
    } else {
      return "rgb(255, 255, 255)";
    }
  }};
`;

export const AppBody = styled.div`
  font-family: Poppins, sans-serif;
  border: ${({ darkMode }) => {
    if (darkMode) {
      return "1px solid rgb(31, 33, 40)";
    } else {
      return "1px solid rgb(247, 247, 247)";
    }
  }};
  background: ${({ darkMode }) => {
    if (darkMode) {
      return "rgb(31, 33, 40)";
    } else {
      return "rgb(247, 247, 247)";
    }
  }};
  margin: auto;
  max-width: 1200px;
`;

export const StyledNav = styled.nav`
  display: flex;
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
  background: ${({ darkMode }) => {
      if (darkMode) {
        return "rgb(44, 47, 54)";
      } else {
        return "rgb(237, 239, 242)";
      }
    }};
  &:hover {
    cursor: pointer;
  }
`;

export const SVGContainer = styled.div`
  width: 23px;
  margin: auto;
  filter: ${({darkMode}) => {
    if(darkMode) {
      return "invert(1)"
    }else{
      return "invert(0)"
    }
  }};
`