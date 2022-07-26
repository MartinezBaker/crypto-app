import React, { useEffect } from "react";
import { connect } from "react-redux/es/exports";
import { getCoinInfo, getChartData } from '../../store/CoinPage/actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { faLink, faExchange } from "@fortawesome/free-solid-svg-icons";
import {
  formatTimePercent,
  formatNum,
  formatCoinName,
  valueCheck,
  formatLink,
  formatChartData,
} from "utils/functionUtils";
import { coinPageMarketDaysArr } from "utils/arrayUtils";
import { setCaretIcon } from "utils/FontAwesomeutil";
import { ReactComponent as BlackLayerLogo } from "imgs/stack.svg";
import { PriceDataInfo, ProgressBar, Link, CopyTextButton, CurrencyInput, MarketDaysInput } from "components";
import { CoinPageLineChart } from "components/Charts";
import {
  ParentDiv,
  DescriptionChild,
  SummeryParent,
  NameSummery,
  PriceSummery,
  MarketInfoSummery,
  ImgInnerContainer,
  ImgOutterContainer,
  CoinNameParent,
  WebSiteContainer,
  WebSiteSpan,
  PriceContainer,
  PercentContainer,
  SVGParent,
  SVGContainer,
  PriceDataContainer,
  MarketDataInfoContainer,
  MarketDataInfo,
  MarketFlexDiv,
  MarketInfoDiv,
  BulletDiv,
  TitleParent,
  TitleChild,
  Spacer,
  LinkParent,
  LinkStyle,
  MaxSupply,
  TotalVol,
  ConverterParent,
  Converter,
  CurrencyLabel,
  Icon,
  ChartParent,
  MarketDaysParent,
  StyledMessage,
  MarketValueDiv,
  MarketCap,
  TitleValueFlex,
} from "./styles";
import { LinkAnchor } from "./styles";

const CoinPage = ({getCoinInfo, getChartData, coinPage, match, main}) => {
  useEffect(() => {
    getCoinInfo(match.params.coinId);
    getChartData(match.params.coinId);
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    getChartData(match.params.coinId);
  }, [coinPage.marketDays, getChartData, match.params.coinId]);
  const handleCopyClick = (link) => {
    navigator.clipboard.writeText(link);
  };
  const key = main.currentCurrency;
  const description = coinPage.coinInfo?.description?.en;
  const thumbNail = coinPage.coinInfo?.image?.small;
  const name = coinPage.coinInfo?.name;
  const symbol = coinPage.coinInfo?.symbol?.toUpperCase();
  const site = formatLink(coinPage.coinInfo?.links?.homepage[0]);
  const twentyFourHourPercent =
    coinPage.coinInfo?.market_data?.price_change_percentage_24h.toString();
  const currPrice = coinPage.coinInfo?.market_data?.current_price[key];
  const marketCap = coinPage.coinInfo?.market_data?.market_cap[key];
  const fullyDilutedValuation =
    coinPage.coinInfo?.market_data?.fully_diluted_valuation[key];
  const volTwentyFourHours =
    coinPage.coinInfo?.market_data?.total_volume[key];
  const volToMarketCap = volTwentyFourHours / marketCap;
  const circulatingSupply =
    coinPage.coinInfo?.market_data?.circulating_supply;
  const maxSupply = coinPage.coinInfo?.market_data?.max_supply;
  const exchangeRate =
    coinPage.coinInfo?.market_data?.market_cap_change_percentage_24h.toString();
  const totalVol = (volTwentyFourHours / currPrice).toFixed(0);
  const blockChainSite = coinPage.coinInfo?.links?.blockchain_site;
  const toCoin =
  coinPage.currencyInput &&
    (
      coinPage.currencyInput?.replace(/[^0-9.]/g, "") / currPrice
    ).toPrecision(2);
  const toCurrency =
    coinPage.coinInput &&
    (coinPage.coinInput?.replace(/[^0-9.]/g, "") * currPrice).toFixed(2);
  const lineChartLabels =
    coinPage.chartData?.prices &&
    formatChartData(coinPage.chartData.prices, 0);
  const lineChartData =
    coinPage.chartData?.prices &&
    formatChartData(coinPage.chartData.prices, 1);
    console.log(coinPage.marketDays)
  return (
    <>
      <ParentDiv>
        <TitleParent>
          <TitleChild>Your Summery:</TitleChild>
        </TitleParent>
        {coinPage.loading ? (
          <StyledMessage>Loading...</StyledMessage>
        ) : coinPage.error ? (
          <StyledMessage>There Was An Error!</StyledMessage>
        ) : (
          <SummeryParent>
            <NameSummery>
              <div>
                <ImgOutterContainer>
                  <ImgInnerContainer>
                    {thumbNail && <img src={thumbNail} alt="Coin" />}
                  </ImgInnerContainer>
                </ImgOutterContainer>
                <CoinNameParent>
                  {name && <div>{`${name} (${symbol})`}</div>}
                </CoinNameParent>
                <div>
                  <WebSiteContainer>
                    <LinkAnchor href={coinPage.coinInfo?.links?.homepage[0]}>
                      <FontAwesomeIcon icon={faLink} />
                      <WebSiteSpan>{site}</WebSiteSpan>
                    </LinkAnchor>
                    <CopyTextButton
                      link={coinPage.coinInfo?.links?.homepage[0]}
                      handleCopyClick={handleCopyClick}
                    />
                  </WebSiteContainer>
                </div>
              </div>
            </NameSummery>
            <PriceSummery>
              <div>
                <div>
                  <PriceContainer>
                    {main.symbol}
                    {currPrice?.toLocaleString()}
                  </PriceContainer>
                </div>
                <div>
                  <PercentContainer data={twentyFourHourPercent}>
                    {twentyFourHourPercent &&
                      setCaretIcon(twentyFourHourPercent)}{" "}
                    {formatTimePercent(twentyFourHourPercent)}
                  </PercentContainer>
                </div>
                <SVGParent>
                  <SVGContainer>
                    <BlackLayerLogo />
                  </SVGContainer>
                </SVGParent>
                <PriceDataContainer>
                  <PriceDataInfo
                    name="ATH"
                    price={
                      coinPage.coinInfo?.market_data?.ath[
                        `${main.currentCurrency}`
                      ]
                    }
                    percent={
                      coinPage.coinInfo?.market_data?.ath_change_percentage[
                        `${main.currentCurrency}`
                      ]
                    }
                    date={
                      coinPage.coinInfo?.market_data?.ath_date[
                        `${main.currentCurrency}`
                      ]
                    }
                    symbol={main.symbol}
                  />
                  <PriceDataInfo
                    name="ATL"
                    price={
                      coinPage.coinInfo?.market_data?.atl[
                        `${main.currentCurrency}`
                      ]
                    }
                    percent={
                      coinPage.coinInfo?.market_data?.atl_change_percentage[
                        `${main.currentCurrency}`
                      ]
                    }
                    date={
                      coinPage.coinInfo?.market_data?.atl_date[
                        `${main.currentCurrency}`
                      ]
                    }
                    symbol={main.symbol}
                  />
                </PriceDataContainer>
              </div>
            </PriceSummery>
            <MarketInfoSummery>
              <MarketDataInfoContainer>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <TitleValueFlex>
                      <MarketInfoDiv>
                        <strong>Market Cap:</strong>
                      </MarketInfoDiv>
                      <MarketValueDiv>
                        <MarketCap>
                          {main.symbol}
                          {valueCheck(formatNum(marketCap))}
                        </MarketCap>
                        <PercentContainer data={exchangeRate}>
                          {exchangeRate && setCaretIcon(exchangeRate)}{" "}
                          {exchangeRate && formatTimePercent(exchangeRate)}
                        </PercentContainer>
                      </MarketValueDiv>
                    </TitleValueFlex>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Fully Diluted Valuation:</strong> {main.symbol}
                      {valueCheck(formatNum(fullyDilutedValuation?.toString()))}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Vol 24h:</strong> {main.symbol}
                      {valueCheck(formatNum(volTwentyFourHours))}
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
                <Spacer />
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <TotalVol>Total Volume:</TotalVol>{" "}
                      {valueCheck(totalVol, symbol)}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Circulating Supply:</strong>{" "}
                      {valueCheck(circulatingSupply?.toFixed(0), symbol)}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <MaxSupply>Max Supply:</MaxSupply>{" "}
                      {valueCheck(maxSupply?.toFixed(0), symbol)}{" "}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <div>
                  <ProgressBar
                    progress={(circulatingSupply / maxSupply) * 100}
                    width={"180px"}
                    height={"8px"}
                  />
                </div>
              </MarketDataInfoContainer>
            </MarketInfoSummery>
          </SummeryParent>
        )}
        {description ? (
          <div>
            <TitleParent>
              <TitleChild>Description:</TitleChild>
            </TitleParent>
            <div>
              <DescriptionChild
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <LinkParent>
          {blockChainSite?.[0] && (
            <LinkStyle>
              <Link
                link={blockChainSite?.[0]}
                handleCopyClick={handleCopyClick}
              />
            </LinkStyle>
          )}
          {blockChainSite?.[1] && (
            <LinkStyle>
              <Link
                link={blockChainSite?.[1]}
                handleCopyClick={handleCopyClick}
              />
            </LinkStyle>
          )}
          {blockChainSite?.[2] && (
            <LinkStyle>
              <Link
                link={blockChainSite?.[2]}
                handleCopyClick={handleCopyClick}
              />
            </LinkStyle>
          )}
        </LinkParent>
        <MarketDaysParent>
          {coinPageMarketDaysArr.map((days) => (
            <MarketDaysInput
              key={days.name}
              id={days.name}
              name="days"
              value={days.name}
              active={coinPage.marketDays === days.numDays}
            />
          ))}
        </MarketDaysParent>
        <ConverterParent>
          <Converter>
            <CurrencyLabel>{main.currentCurrency.toUpperCase()}</CurrencyLabel>
            <CurrencyInput
              symbol={main.symbol}
              currency={main.currentCurrency}
              exchange={toCurrency}
            />
          </Converter>
          <Icon>
            <FontAwesomeIcon icon={faExchange} />
          </Icon>
          <Converter>
            <CurrencyLabel>{symbol?.toUpperCase()}</CurrencyLabel>
            <CurrencyInput symbol={symbol?.toUpperCase()} exchange={toCoin} />
          </Converter>
        </ConverterParent>
      </ParentDiv>
      <ChartParent>
        <CoinPageLineChart labels={lineChartLabels} data={lineChartData} />
      </ChartParent>
    </>
  );
}
const mapStateToProps = (state) => ({
  coinPage: state.coinPage,
  main: state.main
});
const mapDispatchToProps = (dispatch) => {
  return{
    getCoinInfo: (coin) => dispatch(getCoinInfo(coin)),
    getChartData: (coin) => dispatch(getChartData(coin))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoinPage));