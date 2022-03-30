import styled from "styled-components";

export const ChartParent = styled.div`
  display: flex
`
export const LineChartContainer = styled.div`
  border: 1px solid black;
  border-radius: 25px;
  padding: 19px 30px 19px 30px;
  width: 445px;
  margin: 80px 15px 0px 60px;
  position: relative;
  
`;

export const BarChartContainer = styled.div`
  border: 1px solid black;
  border-radius: 25px;
  padding: 19px 30px 19px 30px;
  width: 445px;
  margin: 80px 60px 0px 15px;
  position: relative;
`;

export const TextContainer = styled.div`
  position: absolute;
  left: 16px;
`;

export const SubText = styled.div`
  font-weight: bold;
  font-size: 18.72px;
`;

export const PriceText = styled.div`
  font-weight: bold;
  font-size: 24px;

`

export const TableContainer = styled.div`
  margin: 30px 60px 30px 60px;
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