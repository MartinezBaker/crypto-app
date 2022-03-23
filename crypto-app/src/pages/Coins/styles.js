import styled from "styled-components";

export const TableContainer = styled.div`
  margin: 50px;
  border: 1px solid black;
  border-radius: 25px;
  padding: 10px;
`

export const TableHeader = styled.th`
  text-align: start;
  border-bottom: 1px solid black;
  border-left: none;
  padding: 15px 0px 15px 2px;
`;

export const Table = styled.table`
  width: 100%;
  counter-reset: rowNumber;
  border-collapse: collapse;
  border-bottom: 1px solid black;
  border-left: none;
  padding: 15px 0px 15px 8px;
  font-size: 12px;
  font-weight: bold;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid black;
  border-left: none;
  padding: 15px 0px 15px 0px;
`;

export const SortButton = styled.button`
  border: none;
  background: none;
  &:focus {
    border: none;
    outline: none;
  }
  &:hover{
    cursor: pointer;
  }
`