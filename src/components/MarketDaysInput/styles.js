import styled from "styled-components";

export const StyledMarketDay = styled.div`
  margin: 10px;
`

export const StyledInput = styled.input`
  appearance: none;
  height: 23px;
  width: 23px;
  vertical-align: bottom;
  border: 1px solid ${({ theme }) => theme.chart};
  border-radius: 50%;
  &:checked {
    background-color: ${({ theme }) => theme.chart};
    &:focus {
      outline: 5px solid ${({ theme }) => theme.buttonFocus}
  }
  &:hover {
    cursor: pointer;
  }
`;

export const StyledLabel = styled.label`
  margin-left: 5px;
  font-size: 12px;
  color:${({ theme }) => theme.text};
`;