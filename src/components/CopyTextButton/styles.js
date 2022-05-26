import styled from 'styled-components'

export const StyledButton = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;