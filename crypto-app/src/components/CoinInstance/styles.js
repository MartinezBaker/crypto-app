import styled from "styled-components";

export const DataRow = styled.tr`
  &:before {
    display: table-cell;
    counter-increment: rowNumber;
    content: counter(rowNumber);
    min-width: 1em;
    padding: 0px 80px, 0px, 10px;
    vertical-align: middle;
  }
  border-bottom: 1px solid black;
  border-left: none;
  padding: 15px;
`;

export const CoinImage = styled.img`
    width: 40px;
    vertical-align: middle;
    margin-right: 5px;
`
export const PercentColor = styled.td`
  color: ${(props) => {
    const data = props.data;

    if (data && data.includes("-")) {
      return "red";
    }
    if (data && !data.includes("-")) {
      return "limegreen";
    }
  }};
  border-bottom: 1px solid black;
  border-left: none;
  padding: 15px;
`;

export const TableCell = styled.td`
  border-bottom: 1px solid black;
  border-left: none;
  padding: 15px;
`;


