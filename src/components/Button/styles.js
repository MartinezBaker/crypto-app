import styled from "styled-components";

export const MarketDaysButton = styled.button`
  font-family: Poppins, sans serif;
  padding-inline: 14px;
  padding-block: 6px;
  font-size: 14px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background-color: ${({ active, theme }) => {
    if (active) {
      return theme.chart;
    } else {
      return  theme.app;
    }
  }};
  color: ${({ theme }) => theme.text};
`;