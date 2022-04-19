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
`;

export const SummeryParent = styled.div`
    display flex;
    width: 100%;
    justify-content: space-between;
    
`

export const SummeryChild = styled.div`
  border: 1px solid white;
  border-radius: 25px;
  background: white;
  padding: 25px 36px 15px 36px ;
  text-align: center;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  margin: 5px;
`;

export const CoinInfoContainer = styled.div`
 
`

export const ImgOutterContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export const ImgInnerContainer = styled.div`
    padding: 24px;
    background: rgb(247, 247, 247);
    width: 50px;
    display: inline-block;
`;

export const CoinNameParent = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const WebSiteParent = styled.div`
  width: 100%;
  font-size: 12px;
`

export const WebSiteContainer = styled.div`
  background: rgb(247, 247, 247);
  border: solid 1px rgb(247, 247, 247);
  border-radius: 10px;
  padding: 4px 20px 4px 20px;
  width: 180px;
  
`;

export const WebSiteSpan = styled.span`
  margin-left: 6px;
`

export const PriceInfoContainer = styled.div`
 
`

export const PriceParent = styled.div`
  width: 100%;
`

export const PriceContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
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
`

export const PriceDataContainer = styled.div`
  width 100%;
  display: flex;
`

export const MarketDataInfoContainer = styled.div`
  font-size: 12px;
  text-align: left;
  margin-right: 100px;
  
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
`

export const DescriptionParent = styled.div`
  width: 100%;
`;

export const DescriptionChild = styled.div`
  border: 1px solid white;
  border-radius: 25px;
  margin: 5px 5px 30px 5px;
  padding: 10px;
  background-color: white;
  padding-inline: 36px;
  padding-block: 18px;
  font-size: 12px;
`;