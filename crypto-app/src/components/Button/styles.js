import styled from "styled-components";

export const MarketDaysButton = styled.button`
  font-family: Poppins, sans serif;
  padding-inline: 14px;
  padding-block: 6px;
  font-size: 14px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background-color: ${({ active, darkMode }) => {
    if (active) {
      return darkMode ? "rgb(2, 117, 216)" : "rgb(0, 252, 42)";
    } else {
      return darkMode ? "rgb(31, 33, 40)" : "#f7f7f7";
    }
  }};
  color: ${({ darkMode }) => {
    if (darkMode) {
      return "white";
    } else {
      return "black";
    }
  }};
`;