import styled from "styled-components";

export const ParentDiv = styled.div`
 padding: 0px 50px 0px 50px;
`;

export const TitleParent = styled.div`
  width: 100%
`

export const TitleChild = styled.div`
  margin: 10px 5px 5px 5px;
  font-size: 23px;
  color:${({darkMode}) => {
    if(darkMode){
      return "white"
    }else{
      return "black"
    }
  }};
`;

export const SummeryParent = styled.div`
    display flex;
    width: 100%;
`

export const SummeryChild = styled.div`
  border-radius: 25px;
  background-color: ${({ darkMode }) => {
    if (darkMode) {
      return "rgb(25, 27, 31)";
    } else {
      return "white";
    }
  }};
  padding: 25px 36px 15px 36px;
  text-align: center;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  margin: 5px;
`;

export const ImgOutterContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export const ImgInnerContainer = styled.div`
  padding: 24px;
  background-color: ${({ darkMode }) => {
    if (darkMode) {
      return "rgb(31, 33, 40)";
    } else {
      return "white";
    }
  }};
  width: 50px;
  display: inline-block;
`;

export const CoinNameParent = styled.div`
  width: 100%;
  margin-bottom: 20px;
  color:${({darkMode}) => {
    if(darkMode){
      return "white"
    }else{
      return "black"
    }
  }}
`;

export const WebSiteParent = styled.div`
  width: 100%;
  font-size: 11px;
`

export const WebSiteContainer = styled.div`
  background-color: ${({ darkMode }) => {
    if (darkMode) {
      return "rgb(31, 33, 40)";
    } else {
      return "white";
    }
  }};
  border-radius: 10px;
  padding: 4px 20px 4px 20px;
  width: 203px;
  margin: auto;
`;
export const LinkAnchor = styled.a`
  text-decoration: none;
  color:${({darkMode}) => {
    if(darkMode){
      return "white"
    }else{
      return "black"
    }
  }};
`;

export const WebSiteSpan = styled.span`
  margin: 0px 6px 0px 6px;
`;

export const PriceParent = styled.div`
  width: 100%;
`

export const PriceContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
  color:${({darkMode}) => {
    if(darkMode){
      return "white"
    }else{
      return "black"
    }
  }}
`

export const PercentParent = styled.div`
  width: 100%;
`

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

export const SVGParent = styled.div`
 width: 100%;
 margin-top: 10px
`

export const SVGContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  color:${({darkMode}) => {
    if(darkMode){
      return "white"
    }else {
      return "black"
    }
  }}
`

export const PriceDataContainer = styled.div`
  width 100%;
  display: flex;
`

export const MarketDataInfoContainer = styled.div`
  font-size: 12px;
  text-align: left;
  margin-right: 50px;
 `;

export const MarketDataInfo = styled.div`
  margin-bottom: 5px;
`;

export const MarketFlexDiv = styled.div`
  display: flex;
`

export const BulletDiv = styled.div`
  border: 1px solid #0275d8;
  background-color: #0275d8;
  color: white;
  border-radius: 5px;
  padding: 0px 5px 0px 5px;
  margin-right: 5px;
  max-height: 18px;
`;

export const MarketInfoDiv = styled.div`
  margin-right: 4px;
  color:${({darkMode}) => {
    if(darkMode){
      return "white"
    }else{
      return "black"
    }
  }};
`

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

export const DescriptionParent = styled.div`
  width: 100%;
`;

export const DescriptionChild = styled.div`
  border-radius: 25px;
  margin: 5px 5px 30px 5px;
  padding: 18px 36px 18px 36px;
  background-color: ${({ darkMode }) => {
    if (darkMode) {
      return "rgb(25, 27, 31)";
    } else {
      return "white";
    }
  }};
  color: ${({ darkMode }) => {
    if (darkMode) {
      return "white";
    } else {
      return "black";
    }
  }};
  font-size: 12px;
  a {
    text-decoration: none;
    color: inherit;
    color: #0275d8;
    background-color: ${({ darkMode }) => {
      if (darkMode) {
        return "rgb(31, 33, 40)";
      } else {
        return "rgb(247, 247, 247);";
      }
    }};
  }
`;

export const LinkParent = styled.div`
  width: 100%;
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
  background-color: ${({darkMode}) => {
    if(darkMode){
      return "rgb(25, 27, 31)";
    }else{
      return "white"
    }
  }};
  font-size: 12px;
  text-decoration: none;
`;

export const MarketDaysParent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px;
`;

export const ConverterParent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const Converter = styled.div`
  display: flex;
  margin: 5px;
`
export const CurrencyLabel = styled.div`
  border: ${({ darkMode }) => {
    if (darkMode) {
      return "1px solid rgb(0, 252, 42)"
    } else {
      return "1px solid #0275d8";
    }
  }};
  background-color: ${({ darkMode }) => {
    if (darkMode) {
      return "rgb(0, 252, 42)";
    } else {
      return "#0275d8";
    }
  }};
  color: white;
  border-radius: 8px 0px 0px 8px;
  padding: 7px 20px 7px 20px;
  font-size: 12px;
  width: 28px;
`;

export const Icon = styled.div`
  margin: auto 10px;
  font-size: 17px;
  color: ${({darkMode}) => {
    if(darkMode){
      return "white"
    }else{
      return "black"
    }
  }}
 `

export const ChartParent = styled.div`
  width: 100%;
`