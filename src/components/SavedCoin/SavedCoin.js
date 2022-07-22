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
    const filteredCoin = props.portfolio.coins.filter((coin) => coin.id === props.id)
    const filterHistoryData = props.portfolio.historyData.filter((coin) => coin.id === props.id)
    const coin = filteredCoin[0]
    const currency = props.main.currentCurrency
    const priceDiff =
      (((coin?.current_price -
        filterHistoryData[0]?.market_data?.current_price[`${currency}`]) /
        filterHistoryData[0]?.market_data?.current_price[`${currency}`]) *
      100).toFixed(2)
    const priceChangeTwentyFour = coin.price_change_percentage_24h_in_currency.toFixed(2)
    const price = coin.current_price
    return (
      <SavedCoinContainer>
        <SavedCoinDescContainer>
          <SavedCoinDescription>
            <ImgOutterContainer>
              <ImgInnerContainer>
                <StyledImage src={coin.image} alt="Coin Logo" />
              </ImgInnerContainer>
            </ImgOutterContainer>
            <CoinNameContainer>
              <CoinName>{coin.name}</CoinName>
              <div>({coin.symbol.toUpperCase()})</div>
            </CoinNameContainer>
            <StyledIcon onClick={() => props.deleteCoin(coin.name)}>
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
                {price.toLocaleString()}
              </SavedCoinInfoValue>
              <SavedCoinInfoTitle>
                <strong>Price 24h chg:</strong>
              </SavedCoinInfoTitle>
              <SavedCoinInfoValue>
                <PercentColor
                  data={coin.price_change_percentage_24h_in_currency.toString()}
                >
                  {coin.price_change_percentage_24h_in_currency &&
                    setCaretIcon(
                      coin.price_change_percentage_24h_in_currency.toString()
                    )}{" "}
                  {formatTimePercent(priceChangeTwentyFour.toString())}
                </PercentColor>
              </SavedCoinInfoValue>
              <SavedCoinInfoTitle>
                <strong>Vol / Mrkt Cap:</strong>
              </SavedCoinInfoTitle>
              <StyledProgressBar>
                <StyledVolToMrkCap>
                  {(coin.total_volume / coin.total_volume) * 100}%
                </StyledVolToMrkCap>
                <ProgressBar
                  progress={(coin.total_volume / coin.total_volume) * 100}
                  width={"60px"}
                />
              </StyledProgressBar>
              <SavedCoinInfoTitle>
                <strong>Circ / Total Sup:</strong>
              </SavedCoinInfoTitle>
              <StyledProgressBar>
                <StyledVolToMrkCap>
                  {(coin.circulating_supply / coin.total_supply).toFixed(2) *
                    100}
                  %
                </StyledVolToMrkCap>
                <ProgressBar
                  progress={(coin.circulating_supply / coin.total_supply) * 100}
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
                  {(props.amount * coin.current_price).toLocaleString()}
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
