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
  @media (max-width: 767px){
    font-size: 15px;
    margin-right: 10px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  width: 65%;
  @media (max-width: 767px) {
    height: 40px;
    width: 85%;
  }
  @media (max-width: 469px) {
    width: 65%;
  }
`;

export const StyledIconContainer = styled.div`
  border-radius: 10px 0 0 10px;
  border: none;
  background: ${({ theme }) => theme.button};
  padding: 10px 0 0 30px;
  color: ${({ theme }) => theme.text};
  @media (max-width: 767px) {
    padding: 10px 0 0 12px;
  }
`;

export const StyledIcon = styled.div`
  width: 24px;
  @media (max-width: 767px){
    width: 18px;
  }
`