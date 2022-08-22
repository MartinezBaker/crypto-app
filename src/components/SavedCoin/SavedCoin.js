import React from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from "components";
import { setCaretIcon } from "utils/FontAwesomeutil";
import { formatTimePercent, formatDate } from "utils/functionUtils";
import { ReactComponent as Delete } from "imgs/x-mark2.svg";
import { deleteCoin } from 'store/Portfolio/actions';
import { SavedCoinContainer,
  SavedCoinDescContainer,
  SavedCoinDescription,
  SavedCoinMarketPrice,
  MySavedCoin,
  SavedCoinInfo,
  ImgOutterContainer,
  ImgInnerContainer,
  StyledImage,
  CoinNameContainer,
  CoinName,
  SavedCoinMarketPriceCont,
  MySavedCoinCont,
  SavedCoinInfoText,
  StyledIcon,
  SavedCoinInfoTitle,
  SavedCoinInfoValue,
  PercentColor,
  StyledProgressBar,
  StyledVolToMrkCap,
  TextColor
 } from './styles'

const SavedCoin = (props) => {
    const filteredCoin = props.portfolio.currentInfoArry?.filter((coin) => coin.id === props.id)
    const coin = filteredCoin?.[0]
    const priceDiff = (
      ((coin?.market_data.current_price?.[`${props.main.currentCurrency}`] -
        props.priceAtPurchase?.[`${props.main.currentCurrency}`]) /
        props.priceAtPurchase?.[`${props.main.currentCurrency}`]) *
      100
    ).toFixed(2);
    const priceChangeTwentyFour =
      coin?.market_data.price_change_24h_in_currency[`${props.main.currentCurrency}`].toFixed(2);
    return (
      <SavedCoinContainer>
        <SavedCoinDescContainer>
          <SavedCoinDescription>
            <ImgOutterContainer>
              <ImgInnerContainer>
                <StyledImage src={props.image} alt="Coin Logo" />
              </ImgInnerContainer>
            </ImgOutterContainer>
            <CoinNameContainer>
              <CoinName>{props.name}</CoinName>
              <div>({props.symbol?.toUpperCase()})</div>
            </CoinNameContainer>
            <StyledIcon onClick={() => props.deleteCoin(props.id)}>
              <Delete />
            </StyledIcon>
          </SavedCoinDescription>
        </SavedCoinDescContainer>
        <SavedCoinInfo>
          <SavedCoinMarketPriceCont>
            <SavedCoinInfoText>
              <strong>Market Price:</strong>
            </SavedCoinInfoText>
            <SavedCoinMarketPrice>
              <SavedCoinInfoTitle>
                <strong>Price Now:</strong>
              </SavedCoinInfoTitle>
              <SavedCoinInfoValue>
                {props.main.symbol}
                {coin?.market_data.current_price[
                  `${props.main.currentCurrency}`
                ].toLocaleString()}
              </SavedCoinInfoValue>
              <SavedCoinInfoTitle>
                <strong>Price 24h chg:</strong>
              </SavedCoinInfoTitle>
              <SavedCoinInfoValue>
                <PercentColor data={priceChangeTwentyFour?.toString()}>
                  {priceChangeTwentyFour &&
                    setCaretIcon(priceChangeTwentyFour?.toString())}{" "}
                  {formatTimePercent(priceChangeTwentyFour?.toString())}
                </PercentColor>
              </SavedCoinInfoValue>
              <SavedCoinInfoTitle>
                <strong>Vol / Mrkt Cap:</strong>
              </SavedCoinInfoTitle>
              <StyledProgressBar>
                <StyledVolToMrkCap>
                  {(
                    coin?.market_data.total_volume[
                      `${props.main.currentCurrency}`
                    ] /
                    coin?.market_data.market_cap[
                      `${props.main.currentCurrency}`
                    ]
                  ).toFixed(1) * 100}
                  %
                </StyledVolToMrkCap>
                <ProgressBar
                  progress={
                    (coin?.market_data.total_volume[
                      `${props.main.currentCurrency}`
                    ] /
                      coin?.market_data.market_cap[
                        `${props.main.currentCurrency}`
                      ]) *
                    100
                  }
                  width={"60px"}
                />
              </StyledProgressBar>
              <SavedCoinInfoTitle>
                <strong>Circ / Total Sup:</strong>
              </SavedCoinInfoTitle>
              <StyledProgressBar>
                <StyledVolToMrkCap>
                  {(
                    coin?.market_data.circulating_supply /
                    coin?.market_data.total_supply
                  ).toFixed(2) * 100}
                  %
                </StyledVolToMrkCap>
                <ProgressBar
                  progress={
                    (coin?.market_data.circulating_supply /
                      coin?.market_data.total_supply) *
                    100
                  }
                  width={"60px"}
                />
              </StyledProgressBar>
            </SavedCoinMarketPrice>
          </SavedCoinMarketPriceCont>
          <MySavedCoinCont>
            <SavedCoinInfoText>Your Coin:</SavedCoinInfoText>
            <MySavedCoin>
              <SavedCoinMarketPrice>
                <SavedCoinInfoTitle>
                  <strong>Amount:</strong>
                </SavedCoinInfoTitle>
                <SavedCoinInfoValue>{props.amount}</SavedCoinInfoValue>
                <SavedCoinInfoTitle>
                  <strong>Value:</strong>
                </SavedCoinInfoTitle>
                <SavedCoinInfoValue>
                  {props.main.symbol}
                  {(
                    props.amount *
                    coin?.market_data.current_price[
                      `${props.main.currentCurrency}`
                    ]
                  ).toLocaleString()}
                </SavedCoinInfoValue>
                <SavedCoinInfoTitle>
                  <strong>Price At Purchase:</strong>
                </SavedCoinInfoTitle>
                <SavedCoinInfoValue>
                  {props.main.symbol}
                  {props.priceAtPurchase?.[
                    `${props.main.currentCurrency}`
                  ].toLocaleString()}
                </SavedCoinInfoValue>
                <SavedCoinInfoTitle>
                  <strong>Price Change Since Purchase:</strong>
                </SavedCoinInfoTitle>
                <SavedCoinInfoValue>
                  {isNaN(priceDiff) ? (
                    <TextColor>Information Not Available</TextColor>
                  ) : (
                    <PercentColor data={priceDiff.toString()}>
                      {priceDiff && setCaretIcon(priceDiff.toString())}{" "}
                      {formatTimePercent(priceDiff)}
                    </PercentColor>
                  )}
                </SavedCoinInfoValue>
                <SavedCoinInfoTitle>
                  <strong>Purchase Date:</strong>
                </SavedCoinInfoTitle>
                <SavedCoinInfoValue>
                  {formatDate(props.date)}
                </SavedCoinInfoValue>
              </SavedCoinMarketPrice>
            </MySavedCoin>
          </MySavedCoinCont>
        </SavedCoinInfo>
      </SavedCoinContainer>
    );
};
const mapStateToProps = (state) => ({
    main: state.main,
    portfolio: state.portfolio, 
    coins: state.coins
})
const mapDispatchToProps = (dispatch) => {
    return{
        deleteCoin: (id) => dispatch(deleteCoin(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedCoin)
