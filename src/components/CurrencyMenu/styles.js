import styled from "styled-components";

export const DropDownContainer = styled.div`
  background-color: ${({theme}) => theme.button};
  border-radius: 10px;
  padding: 10px;
  display: flex;
`


export const StyledSelect = styled.select`
  margin: 0px 1px 0px 5px;
  border: none;
  background-color:${({ theme }) => theme.button };
  color:${({theme}) => theme.text};
  font-size: 19px;
  appearance: none;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor:pointer
  }
`;

export const StyledSymbolSpan = styled.span`
  background-color: black;
  color: rgb(0, 252, 42);
  border-radius: 50%;
  padding: 3px 8px 3px 8px;
  font-size: 17px;
`;

export const StyledIconContainer = styled.span`
  font-size: 15px;
  color: rgb(0, 252, 42);
`;