import styled from 'styled-components'

export const ChartTable = styled.div`
  width: 145px;
  height: 40px;
`;

export const StyledMessage = styled.h2`
  color: ${({ darkMode }) => {
    if (darkMode) {
      return "white";
    } else {
      return "black";
    }
  }};
`;