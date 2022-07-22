import styled from "styled-components";

export const SavedCoinContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const SavedCoinDescContainer = styled.div`
  @media (max-width: 600px) {
    width: 100%;
  }
  width: 140px;
`;

export const SavedCoinDescription = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  background-color: ${({ theme }) => theme.body};
  margin: 0 10px 10px 0;
  border-radius: 25px;
  padding: 40px 15px 0 15px;
  text-align: center;
  height: 270px;
`;

export const ImgOutterContainer = styled.div`
  width: 100%;
  margin: 25px 0 10px 0;
  text-align: center;
`;

export const ImgInnerContainer = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.app};
  width: 50px;
  display: inline-block;
`;

export const StyledImage = styled.img`
  width: 50px;
`;
export const CoinNameContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CoinName = styled.div`
  text-align: center;
`;

export const StyledIcon = styled.button`
  color: red;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export const SavedCoinInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 78%;
`;

export const SavedCoinMarketPriceCont = styled.div`
  width: 98%;
  margin-bottom: 10px;
`;

export const SavedCoinMarketPrice = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border-radius: 25px;
  display: flex;
  @media (max-width: 1024px) {
    padding: 38px;
  }
  padding: 48px;
  flex-wrap: wrap;
`;

export const MySavedCoinCont = styled.div`
  width: 98%;
`;

export const MySavedCoin = styled.div`
  background-color: ${({ theme }) => theme.body};
  border-radius: 25px;
`;

export const SavedCoinInfoText = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 12px;
`;

export const SavedCoinInfoTitle = styled.div`
  margin: 0 15px 3px 0;
  font-size: 12px;
`;

export const SavedCoinInfoValue = styled.div`
  margin: 0 25px 3px 0;
  font-size: 12px;
`;

export const PercentColor = styled.span`
  color: ${({ data }) => {
    if (data && data.includes("-")) {
      return "red";
    }
    if (data && !data.includes("-")) {
      return "rgb(0, 252, 42)";
    }
  }};
`;

export const StyledProgressBar = styled.div`
  margin-right: 25px;
  font-size: 12px;
  display: flex; ;
`;

export const StyledVolToMrkCap = styled.div`
  margin: 0 5px 3px 0;
`;

export const TextColor = styled.span`
  color: red;
`