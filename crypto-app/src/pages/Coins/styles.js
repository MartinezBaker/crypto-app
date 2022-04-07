import styled from "styled-components";

export const ParnetDiv = styled.div`
  width: 100%
`
export const TitleParent = styled.div`
  width: 100%
`;

export const TitleChild = styled.div`
  margin: 80px 15px 0px 60px;
  font-size: 23px;
  
`;

export const ChartParent = styled.div`
  display: flex;
  width: 100%;
`
export const LineChartContainer = styled.div`
  border: 1px solid white;
  border-radius: 25px;
  padding: 19px 30px 19px 30px;
  margin: 15px 15px 0px 60px;
  position: relative;
  background-color: white;
  width: 41%;
`;

export const BarChartContainer = styled.div`
  border: 1px solid white;
  border-radius: 25px;
  padding: 19px 30px 19px 30px;
  margin: 15px 60px 0px 14px;
  position: relative;
  background-color: white;
  width: 41%;
`;

export const TextContainer = styled.div`
  position: absolute;
  left: 16px;
  
`;

export const SubText = styled.div`
 font-size: 18.72px;
`;

export const PriceText = styled.div`
  font-size: 27px;
`

export const MarketDaysParent = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 20px;
  padding-block: 15px;
  padding-inline: 6px;
  margin-top: 25px;
  margin-inline: auto;
  width: 500px;
  display: flex;
  justify-content: space-around;
`;

export const TableContainer = styled.div`
  margin: 30px 60px 30px 60px;
  border: 1px solid white;
  border-radius: 25px;
  padding: 10px;
  background-color: white;
  
`
export const TableTitleContainer = styled.div`
  margin-top: 10px;
`

export const TableTitle1 = styled.span`
  font-size: 29px;
  font-weight: bold;
`;

export const TableTitle2 = styled.span`
 font-size: 15px;
 margin-left: 10px;
`;

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
  font-size: 11px;
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