import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [coinInfo, setCoinInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [marketDays, setMarketDays] = useState(29);
  const [chartData, setChartData] = useState(null);
  const [currencyInput, setCurrencyInput] = useState("");
  const [coinInput, setCoinInput] = useState("");

  const getCoinInfo = async () => {
    try {
      const coin = props.match.params.coinId
      setLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false`
      );
      setLoading(false)
      setCoinInfo(data)
    } catch (error) {
      setLoading(false)
      setError(true)
      setErrorMessage("Could Not Load Coin Info!!");
    }
  };
  const getChartData = async () => {
    try {
      const coin = props.match.params.coinId;
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${props.currency}&days=${marketDays}&interval=daily`
      );
      setChartData(data)
    } catch (error) {
      setLoading(true)
      setError(true)
      setErrorMessage("Could Not Load Chart Data!")
    }
  };
  useEffect(() => {
    getCoinInfo();
    getChartData();
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    getChartData();
  }, [marketDays])
  const handleCopyClick = (link) => {
    navigator.clipboard.writeText(link);
  };
  const handleSubmit = (value) => {
   if (value.charAt(0) === props.symbol) {
      setCurrencyInput(value)
      setCoinInput("")
    } else {
      setCoinInput(value)
      setCurrencyInput("")
    }
  };
  const handleClick = (name) => {
    const marketDaysObj = {
      "1d": 1,
      "7d": 6,
      "30d": 29,
      "90d": 89,
      "1y": 364,
      Max: "max",
    };
    Object.entries(marketDaysObj).map((entry) => {
      const [key] = entry;
      if (key === name) {
        return setMarketDays(marketDaysObj[name])
      } else {
        return null;
      }
    });
  }
  const key = props.currency;
  const description = coinInfo?.description?.en;
  const thumbNail = coinInfo?.image?.small;
  const name = coinInfo?.name;
  const symbol = coinInfo?.symbol?.toUpperCase();
  const site = formatLink(coinInfo?.links?.homepage[0]);
  const twentyFourHourPercent =
    coinInfo?.market_data?.price_change_percentage_24h.toString();
  const currPrice = coinInfo?.market_data?.current_price[key];
  const marketCap = coinInfo?.market_data?.market_cap[key];
  const fullyDilutedValuation =
    coinInfo?.market_data?.fully_diluted_valuation[key];
  const volTwentyFourHours = coinInfo?.market_data?.total_volume[key];
  const volToMarketCap = volTwentyFourHours / marketCap;
  const circulatingSupply = coinInfo?.market_data?.circulating_supply;
  const maxSupply = coinInfo?.market_data?.max_supply;
  const exchangeRate =
    coinInfo?.market_data?.market_cap_change_percentage_24h.toString();
  const totalVol = (volTwentyFourHours / currPrice).toFixed(0);
  const blockChainSite = coinInfo?.links?.blockchain_site;
  const toCoin =
    currencyInput &&
    (currencyInput?.replace(/[^0-9.]/g, "") / currPrice).toPrecision(
      2
    );
  const toCurrency =
    coinInput &&
    (coinInput?.replace(/[^0-9.]/g, "") * currPrice).toFixed(2);
  const lineChartLabels =
    chartData?.prices && formatChartData(chartData.prices, 0);
  const lineChartData =
    chartData?.prices && formatChartData(chartData.prices, 1);
  return (
    <>
      <ParentDiv>
        <TitleParent>
          <TitleChild>
            Your Summery:
          </TitleChild>
        </TitleParent>
        {loading ? (
          <StyledMessage>Loading...</StyledMessage>
        ) : error ? (
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
                      href={coinInfo?.links?.homepage[0]}
                    >
                      <FontAwesomeIcon icon={faLink} />
                      <WebSiteSpan>{site}</WebSiteSpan>
                    </LinkAnchor>
                    <CopyTextButton
                      link={coinInfo?.links?.homepage[0]}
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
                    {props.symbol}
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
                      coinInfo?.market_data?.ath[`${props.currency}`]
                    }
                    percent={
                      coinInfo?.market_data?.ath_change_percentage[
                        `${props.currency}`
                      ]
                    }
                    date={
                      coinInfo?.market_data?.ath_date[`${props.currency}`]
                    }
                    symbol={props.symbol}
                  />
                  <PriceDataInfo
                    name="ATL"
                    price={
                      coinInfo?.market_data?.atl[`${props.currency}`]
                    }
                    percent={
                      coinInfo?.market_data?.atl_change_percentage[
                        `${props.currency}`
                      ]
                    }
                    date={
                      coinInfo?.market_data?.atl_date[`${props.currency}`]
                    }
                    symbol={props.symbol}
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
                      <strong>Market Cap:</strong> {props.symbol}
                      {valueCheck(formatNum(marketCap))}
                    </MarketInfoDiv>
                    <PercentContainer
                      data={exchangeRate}
                    >
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
                      {props.symbol}
                      {valueCheck(
                        formatNum(fullyDilutedValuation?.toString())
                      )}
                    </MarketInfoDiv>
                  </MarketFlexDiv>
                </MarketDataInfo>
                <MarketDataInfo>
                  <MarketFlexDiv>
                    <BulletDiv>+</BulletDiv>
                    <MarketInfoDiv>
                      <strong>Vol 24h:</strong> {props.symbol}
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
              <TitleChild>
                Description:
              </TitleChild>
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
              active={marketDays === days.numDays}
              handleClick={handleClick}
            />
          ))}
        </MarketDaysParent>
        <ConverterParent>
          <Converter>
            <CurrencyLabel>
              {props.currency.toUpperCase()}
            </CurrencyLabel>
            <CurrencyInput
              handleSubmit={handleSubmit}
              symbol={props.symbol}
              currency={props.currency}
              exchange={toCurrency}
            />
          </Converter>
          <Icon>
            <FontAwesomeIcon icon={faExchange} />
          </Icon>
          <Converter>
            <CurrencyLabel>
              {symbol?.toUpperCase()}
            </CurrencyLabel>
            <CurrencyInput
              handleSubmit={handleSubmit}
              symbol={symbol?.toUpperCase()}
              exchange={toCoin}
            />
          </Converter>
        </ConverterParent>
      </ParentDiv>
      <ChartParent>
        <CoinPageLineChart
          labels={lineChartLabels}
          data={lineChartData}
          priceTimeArry={chartData?.prices}
          errMessage={errorMessage}
          isLoading={loading}
          hasError={error}
          darkMode={props.darkMode}
        />
      </ChartParent>
    </>
  );
}

export default withRouter(CoinPage);