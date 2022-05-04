import styled from "styled-components";


export const StyledMarketDay = styled.div`
  margin: 10px;
`

export const StyledInput = styled.input`
    appearance: none;
    height: 23px;
    width: 23px;
    vertical-align: bottom;
    border: 1px solid rgb(0, 252, 42);
    border-radius: 50%;
    background-clip: content-box;
    &:checked {
      background-color: rgb(0, 252, 42);
      &:focus {
        outline: 5px solid rgba(0, 252, 42, 0.3);
      }
    }
  }
`;

export const StyledLabel = styled.label`
  margin-left: 5px;
  font-size: 12px;
`