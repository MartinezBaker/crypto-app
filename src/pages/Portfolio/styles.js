import styled from 'styled-components';

export const ParentDiv = styled.div`
  padding: 0px 50px 0px 50px;
`;

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 50px 0px;
 `

export const StyledButton = styled.button`
  margin: auto;
  width: 350px;
  border: none;
  background-color: ${({ theme }) => theme.chart};
  color: ${({ theme }) => theme.text};
  border-radius: 15px;
  padding: 7px 0px;
  &:hover {
    border: 1px solid ${({theme}) => theme.showModalHoverBorder};
    background-color: ${({theme}) => theme.showModalHover};
    color: ${({theme}) => theme.text};
    cursor: pointer;
  };
`;