import styled from 'styled-components';

export const StyledForm = styled.form`
   width: 100%;
`

export const StyledInput = styled.input`
  width: 77%;
  font-size: 17px;
  margin-bottom: 15px;
  padding: 15px 15px 15px 40px;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.text};
  }
  :-ms-input-placeholder {
    color: ${({ theme }) => theme.text};
  }
  &:focus {
    outline: none;
  }
`;