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
`; 

export const DataInfo = styled.div`
    font-size: 12px;
    margin: 15px 5px 0px 45px;
    text-align: left;
    color:${({darkMode})=> {
      if(darkMode){
        return "white"
      }else{
        return "black"
      }
    }};
`;