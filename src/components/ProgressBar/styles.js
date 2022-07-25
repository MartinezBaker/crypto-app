import styled from 'styled-components';

export const Progress = styled.progress`
  width: ${({ width }) => {
    return width;
  }};
  height: ${({ height }) => {
    if (height) {
      return height;
    } else {
      return "15px";
    }
  }};
  -webkit-appearance: none;
  appearance: none;
  ::-webkit-progress-value {
    background-color: #0275d8;
    border-radius: 20px;
  }
  ::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.button};
    border-radius: 20px;
  }
`;
