import styled from "styled-components";

export const TableContainer = styled.div`
  margin: 22px;
`

export const TableHeader = styled.th`
  text-align: start;
  border-bottom: 1px solid black;
  border-left: none;
  padding: 15px 0px 15px 8px;
`;

export const Table = styled.table`
  width: 100%;
  counter-reset: rowNumber;
  border-collapse: collapse;
  border-bottom: 1px solid black;
  border-left: none;
  padding: 15px 0px 15px 8px;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid black;
  border-left: none;
  padding: 15px 0px 15px 8px;
`;