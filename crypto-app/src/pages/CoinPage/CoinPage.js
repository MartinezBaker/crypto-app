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
    const description = Object.values(coinInfo)[10] && Object.values(Object.values(coinInfo)[10])
    const thumbNail = Object.values(coinInfo)[12] && Object.values(Object.values(coinInfo)[12])[1]
    const name = Object.values(coinInfo)[2];
    const symbol = Object.values(coinInfo)[1] && Object.values(coinInfo)[1].toUpperCase();
    const site = Object.values(coinInfo)[11] && Object.values(Object.values(coinInfo)[11])[0][0].slice(7).replaceAll("/","");
    const marketData = Object.entries(coinInfo) && Object.entries(coinInfo).filter((element) => element.at(0) === "market_data")[0]
    const twentyFourHourPercent = marketData && Object.values(marketData[1])[29].usd.toString()
    const currPrice = marketData && Object.values(marketData[1])[0].usd
    marketData && (createDataInfoArry(
      "ATH",
      marketData[1].ath.usd,
      marketData[1].ath_change_percentage.usd,
      marketData[1].ath_date.usd
    ))
    marketData && (createDataInfoArry(
      "ATL",
      marketData[1].atl.usd,
      marketData[1].atl_change_percentage.usd,
      marketData[1].atl_date.usd
    )); 
    const marketCap = marketData && Object.values(marketData[1])[11].usd;
    const fullyDilutedValuation = marketData && Object.values(marketData[1])[13].usd; 
    const volTwentyFourHours = marketData && Object.values(marketData[1])[14].usd;
    const volToMarketCap = volTwentyFourHours / marketCap
    const circulatingSupply = marketData && Object.values(marketData[1])[40]
    const maxSupply = marketData && Object.values(marketData[1])[39]
    const exchangeRate = marketData && Object.values(marketData[1])[26].toString();
    const totalVol = (volTwentyFourHours / currPrice).toFixed(0)
    return (
      <>
        <ParentDiv>
          <TitleParent>
            <TitleChild>Your Summery:</TitleChild>
          </TitleParent>
          <SummeryParent>
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
                      <a
                        href={
                          Object.values(coinInfo)[11] &&
                          Object.values(Object.values(coinInfo)[11])[0][0]
                        }
                      >
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
                      <strong>Vol 24h:</strong> $
                      {formatNum(volTwentyFourHours)}
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
          </SummeryParent>
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