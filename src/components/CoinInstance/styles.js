import styled from "styled-components";

export const DataRow = styled.tr`
  &:before {
    display: table-cell;
    counter-increment: rowNumber;
    content: counter(rowNumber);
    min-width: 1em;
    padding: 0px 10px 0px 10px;
    vertical-align: middle;
  }
  border-bottom: 1px solid ${({ theme }) => theme.text};
  border-left: none;
`;

export const CoinImage = styled.img`
    width: 40px;
    vertical-align: middle;
    margin-right: 5px;
`
export const PercentColor = styled.td`
  color: ${({ data }) => {
    if (data && data.includes("-")) {
      return "red";
    }
    if (data && !data.includes("-")) {
      return "rgb(0, 252, 42)";
    }
  }};
  @media (max-width: 426px) {
    display: none;
  }
`;

export const TableCell = styled.td`
  padding: 30px 0px 30px 8px;
  ;
`;

export const TableProgressCell = styled.td`
  padding: 30px 0px 30px 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TableSparkLineCell = styled.td`
  padding: 30px 0px 30px 8px; 
  @media (max-width: 1024px){
    display: none;
  }
`;

export const VerticalAlign = styled.div`
  verticalAlign: middle;
`

export const ProgressParent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
`