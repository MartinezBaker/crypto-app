import styled from 'styled-components'

export const StyledInput = styled.input`
  border-radius: 0 10px 10px 0;
  border: none;
  background: ${({ theme }) => theme.button};
  margin-right: 20px;
  &:focus {
    outline: none;
  }
  width: 100%;
  font-size: 17px;
  color: ${({ theme }) => theme.text};
  &::-webkit-input-placeholder {
    opacity: 1;
    color: ${({ theme }) => theme.text};
  }
  padding-left: 8px;
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  width: 67%;
`;

export const StyledIcon = styled.div`
  border-radius: 10px 0 0 10px;
  border: none;
  background: ${({ theme }) => theme.button};
  padding: 10px 0 0 30px;
  color: ${({ theme }) => theme.text};
`;