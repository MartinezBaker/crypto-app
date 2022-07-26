import styled from "styled-components";

export const Percent = styled.div`
  color: ${({ data }) => {
    if (data && data.includes("-")) {
      return "red";
    }
    if (data && !data.includes("-")) {
      return "rgb(0, 252, 42)";
    }
  }};
  margin-bottom: 5px;
`; 

export const DataInfo = styled.div`
    font-size: 12px;
    margin: auto;
    text-align: left;
    color:${({theme})=> theme.text};
`;

export const NameDiv = styled.div`
  margin-bottom: 10px;
`

export const PriceDiv = styled.div`
  margin-bottom: 5px;
`;