import styled from "styled-components";

export const ParentDiv = styled.div`
  padding: 0px 50px 0px 50px;
  @media (max-width: 430px) {
    padding: 0 15px 0 15px;
  }
`;

export const TitleParent = styled.div`
  margin-bottom: 10px;
`

export const TitleChild = styled.div`
  margin: 10px 5px 5px 5px;
  font-size: 23px;
  color:${({theme}) => theme.text};
`;

export const SummeryParent = styled.div`
  display flex;
  @media(max-width: 950px){
    flex-wrap: wrap;
  }
`;

export const NameSummery = styled.div`
  border-radius: 25px;
  background-color: ${({ theme }) => theme.body};
  padding: 25px 15px 35px 15px;
  text-align: center;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
  margin: 5px;
`;

export const PriceSummery = styled.div`
  border-radius: 25px;
  background-color: ${({ theme }) => theme.body};
  padding: 25px 15px 35px 15px;
  text-align: center;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
  margin: 5px;
`;

export const MarketInfoSummery = styled.div`
  border-radius: 25px;
  background-color: ${({ theme }) => theme.body};
  padding: 25px 35px 15px 35px;
  text-align: center;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  margin: 5px;
`;

export const ImgOutterContainer = styled.div`
   margin-bottom: 15px;
`;

export const ImgInnerContainer = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.app};
  width: 50px;
  display: inline-block;
`;

export const CoinNameParent = styled.div`
  margin-bottom: 25px;
  color: ${({ theme }) => theme.text};
`;

export const WebSiteContainer = styled.div`
  background-color: ${({ theme }) => theme.app};
  border-radius: 10px;
  padding: 4px 0 4px 0;
  width: 80%;
  margin: auto;
  font-size: 11px;
`;
export const LinkAnchor = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

export const WebSiteSpan = styled.span`
  margin: 0px 6px 0px 6px;
`;

export const PriceContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;

export const PercentContainer = styled.div`
  color: ${({ data }) => {
    if (data && data.includes("-")) {
      return "red";
    }
    if (data && !data.includes("-")) {
      return "rgb(0, 252, 42)";
    }
  }};
`

export const SVGContainer = styled.div`
  margin-top: 15px;
  display: inline-block;
  vertical-align: middle;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;
`;

export const PriceDataContainer = styled.div`
  display: flex;
`

export const MarketDataInfoContainer = styled.div`
  font-size: 12px;
  text-align: left;
  @media (max-width: 430px) {
    margin-left: 10%
  }
  @media (max-width: 950px){
    display: flex;
    flex-wrap: wrap;
  }
`;

export const MarketFlexDiv = styled.div`
  display: flex;
  @media (max-width: 950px) {
    margin: 0 10px 10px 0;
  }
  margin-bottom: 5px;
`;


export const BulletDiv = styled.div`
  border: 1px solid #0275d8;
  background-color: #0275d8;
  color: white;
  border-radius: 5px;
  padding: 3px 5px 3px 5px;
  margin-right: 5px;
  max-height: 12px;
`;

export const MarketInfoDiv = styled.div`
  
  margin-right: 5px;
  color: ${({ theme }) => theme.text};
`;

export const MarketCap = styled.div`
  margin-right: 4px;
  color: ${({ theme }) => theme.text};
`;

export const MarketValueDiv = styled.div`
  color: ${({ theme }) => theme.text};
  margin-right: 5px;
  display: flex;
`;

export const TitleValueFlex = styled.div`
  display: flex;
  @media(max-width: 325px){
    flex-wrap: wrap;
  }
`;

export const Spacer = styled.div`
  height: 18px;
`

export const TotalVol = styled.span`
  color: rgb(0, 252, 42);
  font-weight: bold;
`;

export const MaxSupply = styled.span`
  color: #0275d8;
  font-weight: bold;
`;

export const DescriptionChild = styled.div`
  border-radius: 25px;
  margin: 5px 5px 30px 5px;
  padding: 18px 36px 18px 36px;
  background-color: ${({ theme }) => theme.body};
    }
  }};
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  a {
    text-decoration: none;
    color: inherit;
    color: #0275d8;
    background-color: ${({ theme }) => theme.app};
  }
`;

export const LinkParent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`

export const LinkStyle = styled.div`
  border-radius: 10px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  text-align: center;
  margin: 5px;
  padding: 10px;
  background-color: ${({ theme }) => theme.body};
  font-size: 12px;
  text-decoration: none;
`;

export const MarketDaysParent = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const ConverterParent = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1024px) {
    display: none;
  }
`;
export const Converter = styled.div`
  display: flex;
  margin: 5px;
`
export const CurrencyLabel = styled.div`
  background-color: ${({ theme }) => theme.chart};
  color: white;
  border-radius: 8px 0px 0px 8px;
  padding: 10px 20px 10px 20px;
  font-size: 12px;
  width: 28px;
`;

export const Icon = styled.div`
  margin: auto 10px;
  font-size: 17px;
  color: ${({ theme }) => theme.text};
`;

export const ChartParent = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledMessage = styled.h2`
  color: ${({ theme }) => theme.text};
`;

export const StyledLoading = styled.div`
  display: flex;
`

export const LoaderContainer = styled.div`
  margin: 20px 5px 0 0;
`