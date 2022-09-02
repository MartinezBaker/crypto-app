import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";

export const ParentDiv = styled.div`
  padding: 0px 50px 0px 50px;
  @media (max-width: 430px){
    padding: 0 15px 0 15px;
  }
`;
export const TitleParent = styled.div`
  width: 100%
`;

export const TitleChild = styled.div`
  margin: 80px 0px 10px 0px;
  font-size: 23px;
  color:${({theme}) => theme.text}
 `;

export const ChartParent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between
  
`

export const LineChartContainer = styled.div`
  border-radius: 25px;
  padding: 19px 30px 19px 30px;
  position: relative;
  width: ${({active}) => {
    if(active){
      return "100%"
    }else{
      return "43%"
    }
  }};
  background-color: ${({ theme }) => theme.body};
  margin-right: 10px;
  
`;

export const BarChartContainer = styled.div`
  border-radius: 25px;
  padding: 19px 30px 19px 30px;
  position: relative;
   width: ${({ active }) => {
     if (active) {
       return "100%";
     } else {
       return "43%";
     }
   }};
  background-color: ${({ theme }) => theme.body};
  margin-left: 10px;
`;

export const TextContainer = styled.div`
  position: absolute;
  left: 16px;
  color: ${({ theme }) => theme.text}; 
`;

export const SubText = styled.div`
 font-size: 18.72px;
`;

export const PriceText = styled.div`
  font-size: 27px;
`

export const MarketDaysParent = styled.div`
  background-color: ${({ theme }) => theme.body};
  border-radius: 20px;
  padding-block: 15px;
  padding-inline: 6px;
  margin-top: 25px;
  margin-inline: auto;
  @media (max-width: 600px){
    width: 95%;
    margin-top: 10px;
  }
  @media (max-width: 311px){
    display: none;
  }
  width: 500px;
  display: flex;
  justify-content: space-around;
`;

export const TableParent = styled.div`
  width: 100%
`

export const TableContainer = styled.div`
  margin: 30px 0px 30px 0px;
  border-radius: 25px;
  padding: 10px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text}; 
`;

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
  border-bottom: ${({ theme }) => theme.text};
  border-left: none;
  padding: 15px 0px 15px 2px;
`;

export const PercentageTableHeader = styled.td`
  text-align: start;
  border-bottom: ${({ theme }) => theme.text};
  border-left: none;
  padding: 15px 0px 15px 2px;
  @media (max-width: 600px) {
    display: none;
  }
`;

export const ProgressBarTableHeader = styled.th`
  text-align: start;
  border-bottom: ${({ theme }) => theme.text};
  border-left: none;
  padding: 15px 0px 15px 2px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const LastSevenDayTableHeader = styled.th`
  text-align: start;
  border-bottom: ${({ theme }) => theme.text};
  border-left: none;
  padding: 15px 0px 15px 2px;
  @media (max-width: 1024px){
    display: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  counter-reset: rowNumber;
  border-collapse: collapse;
  border-left: none;
  padding: 15px 0px 15px 0px;
  font-size: 11px;
  overflow: hidden;
 ` 

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.text};
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
  &:hover {
    cursor: pointer;
  }
  color: ${({ theme }) => theme.text};
`;

export const StyledLoader = styled.div`
  margin: 10% 0 0 40%;
`

export const StyledCarousel = styled(Carousel)`
  opacity: 0.5;
`