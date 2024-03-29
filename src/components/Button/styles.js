import styled from "styled-components";

export const MarketDaysButton = styled.button`
  font-weight: bold;
  padding-inline: 14px;
  padding-block: 6px;
  font-size: 14px;
  border-radius: 20px;
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