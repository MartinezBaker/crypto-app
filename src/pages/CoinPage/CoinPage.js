import React, { useEffect } from "react";
import { connect } from "react-redux/es/exports";
import { getCoinInfo, getChartData } from '../../store/CoinPage/actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
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
import { PriceDataInfo, ProgressBar, Link, CopyTextButton, CurrencyInput, MarketDaysInput, MarketDataInfo } from "components";
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
  SVGContainer,
  PriceDataContainer,
  MarketDataInfoContainer,
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
  StyledLoading,
  LoaderContainer,
  FlexDivContainer
} from "./styles";
import { LinkAnchor } from "./styles";

const CoinPage = ({getCoinInfo, getChartData, coinPage, match, main}) => {
  useEffect(() => {
    getCoinInfo(match.params.coinId);
    getChartData(match.params.coinId);
  }, [getCoinInfo, getChartData, main.savedCoinId, match.params.coinId])
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
    coinPage.coinInfo?.market_data?.price_change_percentage_24h.toFixed(2);
  const currPrice = coinPage.coinInfo?.market_data?.current_price[key];
  const marketCap = coinPage.coinInfo?.market_data?.market_cap[key];
  const fullyDilutedValuation = coinPage.coinInfo?.market_data?.fully_diluted_valuation[key];
  const volTwentyFourHours = coinPage.coinInfo?.market_data?.total_volume[key];
  const volToMarketCap = formatCoinName((volTwentyFourHours / marketCap).toString());
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
  return (
    <>
      <ParentDiv>
        <TitleParent>
          <TitleChild>Your Summery:</TitleChild>
        </TitleParent>
        {coinPage.loading ? (
          <StyledLoading>
            <LoaderContainer>
              <FadeLoader
                loading={coinPage.loading}
                color={"rgb(0, 252, 42)"}
                size={10}
              />
            </LoaderContainer>
            <StyledMessage>Loading...</StyledMessage>
          </StyledLoading>
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
                  <PercentContainer data={twentyFourHourPercent?.toString()}>
                    {twentyFourHourPercent &&
                      setCaretIcon(twentyFourHourPercent?.toString())}{" "}
                    {formatTimePercent(twentyFourHourPercent?.toString())}
                  </PercentContainer>
                </div>
                <SVGContainer>
                  <BlackLayerLogo />
                </SVGContainer>
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
                <FlexDivContainer>
                  <MarketDataInfo
                    title="Market Cap"
                    valueSymbol={main.symbol}
                    value={valueCheck(formatNum(marketCap))}
                  />
                  <PercentContainer data={exchangeRate}>
                    {exchangeRate && setCaretIcon(exchangeRate)}{" "}
                    {exchangeRate && formatTimePercent(exchangeRate)}
                  </PercentContainer>
                </FlexDivContainer>
                <MarketDataInfo
                  title="Fully Diluted Valuation"
                  valueSymbol={main.symbol}
                  value={valueCheck(formatNum(fullyDilutedValuation))}
                />
                <MarketDataInfo
                  title="Vol 24h"
                  valueSymbol={main.symbol}
                  value={valueCheck(formatNum(volTwentyFourHours))}
                />
                <MarketDataInfo title="Volume/Market" value={volToMarketCap} />
                <Spacer />
                <MarketDataInfo
                  title={<TotalVol>Total Volume</TotalVol>}
                  value={valueCheck(totalVol, symbol)}
                />
                <MarketDataInfo
                  title="Circulating Supply"
                  value={valueCheck(circulatingSupply?.toFixed(0), symbol)}
                />
                <MarketDataInfo
                  title={<MaxSupply>Max Supply</MaxSupply>}
                  value={valueCheck(maxSupply?.toFixed(0), symbol)}
                />
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