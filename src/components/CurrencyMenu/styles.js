import styled from "styled-components";

export const StyledSelect = styled.select`
  border: none;
  background-color:${({ theme }) => theme.button };
  color:${({theme}) => theme.text};
  padding: 10px 1px 11.5px 0px;
  font-size: 19px;
  appearance: none;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor:pointer
  }
`;

export const StyledSymbolContainer = styled.span`
  border: none;
  background-color:${({ theme }) => theme.button};
  padding: 11px 4px 10px 12px;
  border-radius: 10px 0px 0px 10px;
`;

export const StyledSymbolSpan = styled.span`
  background-color: black;
  color: rgb(0, 252, 42);
  border-radius: 50%;
  padding: 0px 8px 3px 8px;
  font-size: 17px;
`;

export const StyledIconContainer = styled.span`
  border: none;
  background-color: ${({ theme }) => theme.button};
  padding: 12px 12px 10px 2.5px;
  border-radius: 0px 10px 10px 0px;
  font-size: 15px;
  color: rgb(0, 252, 42);
`;