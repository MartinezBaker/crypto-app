import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { formatTimePercent, formatNum, formatCoinName } from 'utils/functionUtils';
import { setCaretIcon } from 'utils/FontAwesomeutil';
import { createDataInfoArry, dataInfoArry } from "utils/arrayUtils";
import { ReactComponent as BlackLayerLogo } from "imgs/stack.svg"
import { PriceDataInfo, ProgressBar } from 'components'
import { ParentDiv, DescriptionParent, DescriptionChild, SummeryParent, SummeryChild, ImgInnerContainer,ImgOutterContainer, CoinNameParent, WebSiteParent, WebSiteContainer, WebSiteSpan, PriceParent, PriceContainer, PercentParent, PercentContainer, SVGParent, SVGContainer, PriceDataContainer, MarketDataInfoContainer,MarketDataInfo, CoinInfoContainer, PriceInfoContainer, MarketFlexDiv, MarketInfoDiv, BulletDiv, TitleParent, TitleChild} from './styles'


class CoinPage extends React.Component{
  state = {
      coinInfo: {},
      isLoading: false,
      hasError: false,
      errMessage: ''
  }
  getCoinInfo = async (coin) => {
      try{
          this.setState({isLoading: true})
          const {data} = await axios(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false`)
          this.setState({isLoading: false, coinInfo: data})
      }catch(error){
          this.setState({isLoading: false, hasError: true, errMessage: "Could Not Load Coin Info!!"})
      }
  }
  componentDidMount(){
      const coin = this.props.match.params.coinId
      this.getCoinInfo(coin)
  }
  render(){
    const { coinInfo } = this.state
    const description = coinInfo.description && coinInfo.description.en
    const thumbNail = coinInfo.image && coinInfo.image.small
    const name = coinInfo.name
    const symbol = coinInfo.symbol && coinInfo.symbol.toUpperCase()
    const site = coinInfo.links && coinInfo.links.homepage[0].slice(6).replaceAll("/", "");
    const twentyFourHourPercent = coinInfo.market_data && coinInfo.market_data.price_change_percentage_24h.toString()
    const currPrice = coinInfo.market_data && coinInfo.market_data.current_price.usd;
    const marketCap = coinInfo.market_data && coinInfo.market_data.market_cap.usd;
    const fullyDilutedValuation = coinInfo.market_data && coinInfo.market_data.fully_diluted_valuation.usd 
    const volTwentyFourHours = coinInfo.market_data && coinInfo.market_data.total_volume.usd
    const volToMarketCap = volTwentyFourHours / marketCap
    const circulatingSupply = coinInfo.market_data && coinInfo.market_data.circulating_supply
    const maxSupply = coinInfo.market_data && coinInfo.market_data.max_supply;
    const exchangeRate = coinInfo.market_data && coinInfo.market_data.market_cap_change_percentage_24h.toString();
    const totalVol = (volTwentyFourHours / currPrice).toFixed(0)
    coinInfo.market_data &&
      createDataInfoArry(
        "ATH",
        coinInfo.market_data.ath.usd,
        coinInfo.market_data.ath_change_percentage.usd,
        coinInfo.market_data.ath_date.usd
      );
    coinInfo.market_data &&
      createDataInfoArry(
        "ATL",
        coinInfo.market_data.atl.usd,
        coinInfo.market_data.atl_change_percentage.usd,
        coinInfo.market_data.atl_date.usd
      ); 
    return (
      <>
        <ParentDiv>
          <TitleParent>
            <TitleChild>Your Summery:</TitleChild>
          </TitleParent>
          {this.state.isLoading ? <h2>Loading...</h2> : this.state.hasError ? <h2>There Was An Error!</h2> : <SummeryParent>
            <SummeryChild>
              <CoinInfoContainer>
                <ImgOutterContainer>
                  <ImgInnerContainer>
                    {thumbNail && <img src={thumbNail} alt="Coin" />}
                  </ImgInnerContainer>
                </ImgOutterContainer>
                <CoinNameParent>
                  {name && <div>{`${name} (${symbol})`}</div>}
                </CoinNameParent>
                <WebSiteParent>
                  <WebSiteContainer>
                    <FontAwesomeIcon
                      style={{ fontSize: "11px" }}
                      icon={faLink}
                    />
                    <WebSiteSpan>
                      <a href={coinInfo.links && coinInfo.links.homepage[0]}>
                        {site}
                      </a>
                    </WebSiteSpan>
                  </WebSiteContainer>
                </WebSiteParent>
              </CoinInfoContainer>
            </SummeryChild>
            <SummeryChild>
              <PriceInfoContainer>
                <PriceParent>
                  <PriceContainer>
                    ${currPrice && currPrice.toLocaleString()}
                  </PriceContainer>
                </PriceParent>
                <PercentParent>
                  <PercentContainer data={twentyFourHourPercent}>
                    {twentyFourHourPercent &&
                      setCaretIcon(twentyFourHourPercent)}{" "}
                    {formatTimePercent(twentyFourHourPercent)}
                  </PercentContainer>
                </PercentParent>
                <SVGParent>
                  <SVGContainer>
                    <BlackLayerLogo />
                  </SVGContainer>
                </SVGParent>
                <PriceDataContainer>
                  {dataInfoArry.map((element) => (
                    <PriceDataInfo
                      key={element.name}
                      name={element.name}
                      price={element.price}
                      percent={element.percent.toString()}
                      date={element.date}
                    />
                  ))}
                </PriceDataContainer>
              </PriceInfoContainer>
            </SummeryChild>
            <SummeryChild>
              <MarketDataInfoContainer>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Market Cap:</strong> ${formatNum(marketCap)}
                    </MarketInfoDiv>
                    <PercentContainer data={exchangeRate}>
                      {exchangeRate && setCaretIcon(exchangeRate)}{" "}
                      {exchangeRate && formatTimePercent(exchangeRate)}
                    </PercentContainer>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Fully Diluted Valuation:</strong> $
                      {formatNum(fullyDilutedValuation)}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Vol 24h:</strong> ${formatNum(volTwentyFourHours)}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Volume/Market:</strong>{" "}
                      {formatCoinName(volToMarketCap.toString())}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Circulating Supply:</strong>{" "}
                      {circulatingSupply && circulatingSupply.toFixed(0)}{" "}
                      {symbol}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <div style={{ height: "18px" }}></div>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Total Volume:</strong> {totalVol} {symbol}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Max Supply:</strong>{" "}
                      {maxSupply && maxSupply.toFixed(0)} {symbol}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <div>
                  <ProgressBar
                    progress={(circulatingSupply / maxSupply) * 100}
                    width={"180px"}
                  />
                </div>
              </MarketDataInfoContainer>
            </SummeryChild>
          </SummeryParent>}
          <TitleParent>
            <TitleChild>Description:</TitleChild>
          </TitleParent>
          <DescriptionParent>
            <DescriptionChild
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </DescriptionParent>
        </ParentDiv>
      </>
    );
  }
}

export default CoinPage;