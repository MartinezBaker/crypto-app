import styled from "styled-components";

export const StyledMarketDay = styled.div`
  margin: 10px;
`

export const StyledInput = styled.input`
  appearance: none;
  height: 23px;
  width: 23px;
  vertical-align: bottom;
  border: ${({ darkMode }) => {
    if (darkMode) {
      return "1px solid rgb(0, 252, 42)";
    } else {
      return "1px solid #0275d8";
    }
  }};
  border-radius: 50%;
  &:checked {
    background-color:${({ darkMode }) => {
      if (darkMode) {
        return "rgb(0, 252, 42)";
      } else {
        return "#0275d8";
      }
    }};
    &:focus {
      outline:${({ darkMode }) => {
        if (darkMode) {
          return "5px solid rgba(0, 252, 42, 0.3);";
        } else {
          return " 5px solid rgba(2, 117, 216, 0.3)";
        }
      }}; 
    }
  }
  &:hover {
    cursor: pointer;
  }
`;

export const StyledLabel = styled.label`
  margin-left: 5px;
  font-size: 12px;
  color:${({darkMode}) => {
    if(darkMode){
      return "white"
    }else{
      return "black"
    }
  }};
`