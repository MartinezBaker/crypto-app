import styled from 'styled-components';

export const Progress = styled.progress`
  width: ${({width}) => {
    return width
  }};
  height: 10;
`;
