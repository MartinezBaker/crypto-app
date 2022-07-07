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
  DescriptionParent,
  DescriptionChild,
  SummeryParent,
  SummeryChild,
  ImgInnerContainer,
  ImgOutterContainer,
  CoinNameParent,
  WebSiteParent,
  WebSiteContainer,
  WebSiteSpan,
  PriceParent,
  PriceContainer,
  PercentParent,
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
} from "./styles";
import { LinkAnchor } from "./styles";

const CoinPage = (props) => {
  useEffect(() => {
    props.getCoinInfo(props.match.params.coinId);
    props.getChartData(props.match.params.coinId);
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    props.getChartData(props.match.params.coinId);
    // eslint-disable-next-line
  }, [props.coinPage.marketDays])
  const handleCopyClick = (link) => {
    navigator.clipboard.writeText(link);
  };
  const key = props.main.currentCurrency;
  const description = props.coinPage.coinInfo?.description?.en;
  const thumbNail = props.coinPage.coinInfo?.image?.small;
  const name = props.coinPage.coinInfo?.name;
  const symbol = props.coinPage.coinInfo?.symbol?.toUpperCase();
  const site = formatLink(props.coinPage.coinInfo?.links?.homepage[0]);
  const twentyFourHourPercent =
    props.coinPage.coinInfo?.market_data?.price_change_percentage_24h.toString();
  const currPrice = props.coinPage.coinInfo?.market_data?.current_price[key];
  const marketCap = props.coinPage.coinInfo?.market_data?.market_cap[key];
  const fullyDilutedValuation =
    props.coinPage.coinInfo?.market_data?.fully_diluted_valuation[key];
  const volTwentyFourHours =
    props.coinPage.coinInfo?.market_data?.total_volume[key];
  const volToMarketCap = volTwentyFourHours / marketCap;
  const circulatingSupply =
    props.coinPage.coinInfo?.market_data?.circulating_supply;
  const maxSupply = props.coinPage.coinInfo?.market_data?.max_supply;
  const exchangeRate =
    props.coinPage.coinInfo?.market_data?.market_cap_change_percentage_24h.toString();
  const totalVol = (volTwentyFourHours / currPrice).toFixed(0);
  const blockChainSite = props.coinPage.coinInfo?.links?.blockchain_site;
  const toCoin =
    props.coinPage.currencyInput &&
    (
      props.coinPage.currencyInput?.replace(/[^0-9.]/g, "") / currPrice
    ).toPrecision(2);
  const toCurrency =
    props.coinPage.coinInput &&
    (props.coinPage.coinInput?.replace(/[^0-9.]/g, "") * currPrice).toFixed(2);
  const lineChartLabels =
    props.coinPage.chartData?.prices &&
    formatChartData(props.coinPage.chartData.prices, 0);
  const lineChartData =
    props.coinPage.chartData?.prices &&
    formatChartData(props.coinPage.chartData.prices, 1);
  return (
    <>
      <ParentDiv>
        <TitleParent>
          <TitleChild>Your Summery:</TitleChild>
        </TitleParent>
        {props.coinPage.loading ? (
          <StyledMessage>Loading...</StyledMessage>
        ) : props.coinPage.error ? (
          <StyledMessage>There Was An Error!</StyledMessage>
        ) : (
          <SummeryParent>
            <SummeryChild>
              <div>
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
                    <LinkAnchor
                      href={props.coinPage.coinInfo?.links?.homepage[0]}
                    >
                      <FontAwesomeIcon icon={faLink} />
                      <WebSiteSpan>{site}</WebSiteSpan>
                    </LinkAnchor>
                    <CopyTextButton
                      link={props.coinPage.coinInfo?.links?.homepage[0]}
                      handleCopyClick={handleCopyClick}
                    />
                  </WebSiteContainer>
                </WebSiteParent>
              </div>
            </SummeryChild>
            <SummeryChild>
              <div>
                <PriceParent>
                  <PriceContainer>
                    {props.main.symbol}
                    {currPrice?.toLocaleString()}
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
                  <PriceDataInfo
                    name="ATH"
                    price={
                      props.coinPage.coinInfo?.market_data?.ath[
                        `${props.main.currentCurrency}`
                      ]
                    }
                    percent={
                      props.coinPage.coinInfo?.market_data
                        ?.ath_change_percentage[`${props.main.currentCurrency}`]
                    }
                    date={
                      props.coinPage.coinInfo?.market_data?.ath_date[
                        `${props.main.currentCurrency}`
                      ]
                    }
                    symbol={props.main.symbol}
                  />
                  <PriceDataInfo
                    name="ATL"
                    price={
                      props.coinPage.coinInfo?.market_data?.atl[
                        `${props.main.currentCurrency}`
                      ]
                    }
                    percent={
                      props.coinPage.coinInfo?.market_data
                        ?.atl_change_percentage[`${props.main.currentCurrency}`]
                    }
                    date={
                      props.coinPage.coinInfo?.market_data?.atl_date[
                        `${props.main.currentCurrency}`
                      ]
                    }
                    symbol={props.main.symbol}
                  />
                </PriceDataContainer>
              </div>
            </SummeryChild>
            <SummeryChild>
              <MarketDataInfoContainer>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Market Cap:</strong> {props.main.symbol}
                      {valueCheck(formatNum(marketCap))}
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
                      <strong>Fully Diluted Valuation:</strong>{" "}
                      {props.main.symbol}
                      {valueCheck(formatNum(fullyDilutedValuation?.toString()))}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Vol 24h:</strong> {props.main.symbol}
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
                  />
                </div>
              </MarketDataInfoContainer>
            </SummeryChild>
          </SummeryParent>
        )}
        {description ? (
          <div>
            <TitleParent>
              <TitleChild>Description:</TitleChild>
            </TitleParent>
            <DescriptionParent>
              <DescriptionChild
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </DescriptionParent>
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
              active={props.coinPage.marketDays === days.numDays}
            />
          ))}
        </MarketDaysParent>
        <ConverterParent>
          <Converter>
            <CurrencyLabel>
              {props.main.currentCurrency.toUpperCase()}
            </CurrencyLabel>
            <CurrencyInput
              symbol={props.main.symbol}
              currency={props.main.currentCurrency}
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
        <CoinPageLineChart
          labels={lineChartLabels}
          data={lineChartData}
        />
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