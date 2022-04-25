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
  border-bottom: 1px solid black;
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
`;

export const TableCell = styled.td`
  padding: 30px 0px 30px 8px;
  ;
`;

export const VerticalAlign = styled.div`
  verticalAlign: middle;
`

export const ProgressParent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
`


