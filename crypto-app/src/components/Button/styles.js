import styled from "styled-components";

export const MarketDaysButton = styled.button`
  font-family: Poppins, sans serif;
  padding-inline: 14px;
  padding-block: 6px;
  font-size: 14px;
  border-radius: 14px;
  border: 1px solid white;
  cursor: pointer; 
  background-color: ${({active}) => {
    if(active) {
      return "rgb(0, 252, 42)";
    }else{
      return "#f7f7f7"
    }
  }}
`;
