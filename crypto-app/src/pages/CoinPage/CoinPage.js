import React from "react";
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
} from "./styles";
import { LinkAnchor } from "./styles";

class CoinPage extends React.Component {
  state = {
    coinInfo: {},
    isLoading: false,
    hasError: false,
    errMessage: "",
    marketDays: 29,
    chartData: {},
    currencyInput: "",
    coinInput: "",
  };
  getCoinInfo = async (coin) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false`
      );
      this.setState({ isLoading: false, coinInfo: data });
    } catch (error) {
      this.setState({
        isLoading: false,
        hasError: true,
        errMessage: "Could Not Load Coin Info!!",
      });
    }
  };
  getChartData = async (coin) => {
    try {
      const { marketDays } = this.state;
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${this.props.currency}&days=${marketDays}&interval=daily`
      );
      this.setState({ chartData: data });
    } catch (error) {
      this.setState({
        isLoading: false,
        hasError: true,
        errMessage: "Could Not Load Chart Data!",
      });
    }
  };
  componentDidMount() {
    const coin = this.props.match.params.coinId;
    this.getCoinInfo(coin);
    this.getChartData(coin);
  }
  componentDidUpdate(prevProps, prevState) {
    const coin = this.props.match.params.coinId;
    if (prevState.marketDays !== this.state.marketDays) {
      this.getChartData(coin);
    }

    if (prevProps.currency !== this.props.currency) {
      this.getChartData(coin);
    }
  }
  handleCopyClick = (link) => {
    navigator.clipboard.writeText(link);
  };
  handleSubmit = (value) => {
    console.log("submit:",value)
    if (value.charAt(0) === this.props.symbol) {
      this.setState({ currencyInput: value, coinInput: "" });
    } else {
      this.setState({ coinInput: value, currencyInput: "" });
    }
  };
  handleClick = (name) => {
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
        return this.setState({ marketDays: marketDaysObj[name] });
      } else {
        return null;
      }
    });
  };
  render() {
    const key = this.props.currency
    const { coinInfo, chartData } = this.state;
    const description = coinInfo.description?.en;
    const thumbNail = coinInfo.image?.small;
    const name = coinInfo.name;
    const symbol = coinInfo.symbol?.toUpperCase();
    const site = formatLink(coinInfo.links?.homepage[0]);
    const twentyFourHourPercent =
      coinInfo.market_data?.price_change_percentage_24h.toString();
    const currPrice = coinInfo.market_data?.current_price[key];
    const marketCap =
      coinInfo.market_data?.market_cap[key];
    const fullyDilutedValuation =
      coinInfo.market_data?.fully_diluted_valuation[key];
    const volTwentyFourHours =
      coinInfo.market_data?.total_volume[key]
    const volToMarketCap = volTwentyFourHours / marketCap;
    const circulatingSupply = coinInfo.market_data?.circulating_supply;
    const maxSupply = coinInfo.market_data?.max_supply;
    const exchangeRate =
      coinInfo.market_data?.market_cap_change_percentage_24h.toString();
    const totalVol = (volTwentyFourHours / currPrice).toFixed(0);
    const blockChainSite = coinInfo.links?.blockchain_site;
    const toCoin =
      this.state.currencyInput &&
      (
        this.state.currencyInput?.replace(/[^0-9.]/g, "") / currPrice
      ).toPrecision(2);
      console.log("toCoin:",toCoin,"state:", this.state.currencyInput)
    const toCurrency =
      this.state.coinInput &&
      (this.state.coinInput?.replace(/[^0-9.]/g, "") * currPrice).toFixed(2);
    const lineChartLabels =
      chartData.prices && formatChartData(chartData.prices, 0);
    const lineChartData =
      chartData.prices && formatChartData(chartData.prices, 1);
    return (
      <>
        <ParentDiv>
          <TitleParent>
            <TitleChild darkMode={this.props.darkMode}>
              Your Summery:
            </TitleChild>
          </TitleParent>
          {this.state.isLoading ? (
            <h2>Loading...</h2>
          ) : this.state.hasError ? (
            <h2>There Was An Error!</h2>
          ) : (
            <SummeryParent>
              <SummeryChild darkMode={this.props.darkMode}>
                <div>
                  <ImgOutterContainer>
                    <ImgInnerContainer darkMode={this.props.darkMode}>
                      {thumbNail && <img src={thumbNail} alt="Coin" />}
                    </ImgInnerContainer>
                  </ImgOutterContainer>
                  <CoinNameParent darkMode={this.props.darkMode}>
                    {name && <div>{`${name} (${symbol})`}</div>}
                  </CoinNameParent>
                  <WebSiteParent>
                    <WebSiteContainer darkMode={this.props.darkMode}>
                      <LinkAnchor
                        darkMode={this.props.darkMode}
                        href={coinInfo.links?.homepage[0]}
                      >
                        <FontAwesomeIcon icon={faLink} />
                        <WebSiteSpan>{site}</WebSiteSpan>
                      </LinkAnchor>
                      <CopyTextButton
                        darkMode={this.props.darkMode}
                        link={coinInfo.links?.homepage[0]}
                        handleCopyClick={this.handleCopyClick}
                      />
                    </WebSiteContainer>
                  </WebSiteParent>
                </div>
              </SummeryChild>
              <SummeryChild darkMode={this.props.darkMode}>
                <div>
                  <PriceParent>
                    <PriceContainer darkMode={this.props.darkMode}>
                      {this.props.symbol}
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
                    <SVGContainer darkMode={this.props.darkMode}>
                      <BlackLayerLogo />
                    </SVGContainer>
                  </SVGParent>
                  <PriceDataContainer>
                    <PriceDataInfo
                      darkMode={this.props.darkMode}
                      name="ATH"
                      price={
                        coinInfo.market_data?.ath[`${this.props.currency}`]
                      }
                      percent={
                        coinInfo.market_data?.ath_change_percentage[
                          `${this.props.currency}`
                        ]
                      }
                      date={
                        coinInfo.market_data?.ath_date[`${this.props.currency}`]
                      }
                      symbol={this.props.symbol}
                    />
                    <PriceDataInfo
                      darkMode={this.props.darkMode}
                      name="ATL"
                      price={
                        coinInfo.market_data?.atl[`${this.props.currency}`]
                      }
                      percent={
                        coinInfo.market_data?.atl_change_percentage[
                          `${this.props.currency}`
                        ]
                      }
                      date={
                        coinInfo.market_data?.atl_date[`${this.props.currency}`]
                      }
                      symbol={this.props.symbol}
                    />
                  </PriceDataContainer>
                </div>
              </SummeryChild>
              <SummeryChild darkMode={this.props.darkMode}>
                <MarketDataInfoContainer>
                  <MarketDataInfo>
                    <MarketFlexDiv>
                      <BulletDiv>+</BulletDiv>
                      <MarketInfoDiv darkMode={this.props.darkMode}>
                        <strong>Market Cap:</strong> {this.props.symbol}
                        {valueCheck(formatNum(marketCap))}
                      </MarketInfoDiv>
                      <PercentContainer
                        darkMode={this.props.darkMode}
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
                      <MarketInfoDiv darkMode={this.props.darkMode}>
                        <strong>Fully Diluted Valuation:</strong>{" "}
                        {this.props.symbol}
                        {valueCheck(
                          formatNum(fullyDilutedValuation?.toString())
                        )}
                      </MarketInfoDiv>
                    </MarketFlexDiv>
                  </MarketDataInfo>
                  <MarketDataInfo>
                    <MarketFlexDiv>
                      <BulletDiv>+</BulletDiv>
                      <MarketInfoDiv darkMode={this.props.darkMode}>
                        <strong>Vol 24h:</strong> {this.props.symbol}
                        {valueCheck(formatNum(volTwentyFourHours))}
                      </MarketInfoDiv>
                    </MarketFlexDiv>
                  </MarketDataInfo>
                  <MarketDataInfo>
                    <MarketFlexDiv>
                      <BulletDiv>+</BulletDiv>
                      <MarketInfoDiv darkMode={this.props.darkMode}>
                        <strong>Volume/Market:</strong>{" "}
                        {formatCoinName(volToMarketCap.toString())}
                      </MarketInfoDiv>
                    </MarketFlexDiv>
                  </MarketDataInfo>
                  <Spacer />
                  <MarketDataInfo>
                    <MarketFlexDiv>
                      <BulletDiv>+</BulletDiv>
                      <MarketInfoDiv darkMode={this.props.darkMode}>
                        <TotalVol>Total Volume:</TotalVol>{" "}
                        {valueCheck(totalVol, symbol)}
                      </MarketInfoDiv>
                    </MarketFlexDiv>
                  </MarketDataInfo>
                  <MarketDataInfo>
                    <MarketFlexDiv>
                      <BulletDiv>+</BulletDiv>
                      <MarketInfoDiv darkMode={this.props.darkMode}>
                        <strong>Circulating Supply:</strong>{" "}
                        {valueCheck(circulatingSupply?.toFixed(0), symbol)}
                      </MarketInfoDiv>
                    </MarketFlexDiv>
                  </MarketDataInfo>
                  <MarketDataInfo>
                    <MarketFlexDiv>
                      <BulletDiv>+</BulletDiv>
                      <MarketInfoDiv darkMode={this.props.darkMode}>
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
                <TitleChild darkMode={this.props.darkMode}>
                  Description:
                </TitleChild>
              </TitleParent>
              <DescriptionParent>
                <DescriptionChild
                  darkMode={this.props.darkMode}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </DescriptionParent>
            </div>
          ) : (
            ""
          )}
          <LinkParent>
            {blockChainSite?.[0] && (
              <LinkStyle darkMode={this.props.darkMode}>
                <Link
                  darkMode={this.props.darkMode}
                  link={blockChainSite?.[0]}
                  handleCopyClick={this.handleCopyClick}
                />
              </LinkStyle>
            )}
            {blockChainSite?.[1] && (
              <LinkStyle darkMode={this.props.darkMode}>
                <Link
                  darkMode={this.props.darkMode}
                  link={blockChainSite?.[1]}
                  handleCopyClick={this.handleCopyClick}
                />
              </LinkStyle>
            )}
            {blockChainSite?.[2] && (
              <LinkStyle darkMode={this.props.darkMode}>
                <Link
                  darkMode={this.props.darkMode}
                  link={blockChainSite?.[2]}
                  handleCopyClick={this.handleCopyClick}
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
                active={this.state.marketDays === days.numDays}
                handleClick={this.handleClick}
                darkMode={this.props.darkMode}
              />
            ))}
          </MarketDaysParent>
          <ConverterParent>
            <Converter>
              <CurrencyLabel darkMode={this.props.darkMode}>
                {this.props.currency.toUpperCase()}
              </CurrencyLabel>
              <CurrencyInput
                darkMode={this.props.darkMode}
                handleSubmit={this.handleSubmit}
                symbol={this.props.symbol}
                currency={this.props.currency}
                exchange={toCurrency}
                handleKeyDown={this.handleKeyDown}
              />
            </Converter>
            <Icon darkMode={this.props.darkMode}>
              <FontAwesomeIcon icon={faExchange} />
            </Icon>
            <Converter>
              <CurrencyLabel darkMode={this.props.darkMode}>
                {symbol?.toUpperCase()}
              </CurrencyLabel>
              <CurrencyInput
                darkMode={this.props.darkMode}
                handleSubmit={this.handleSubmit}
                symbol={symbol?.toUpperCase()}
                exchange={toCoin}
                handleKeyDown={this.handleKeyDown}
              />
            </Converter>
          </ConverterParent>
        </ParentDiv>
        <ChartParent>
          <CoinPageLineChart
            labels={lineChartLabels}
            data={lineChartData}
            priceTimeArry={chartData.prices}
            errMessage={this.state.errMessage}
            isLoading={this.state.isLoading}
            hasError={this.state.hasError}
            darkMode={this.props.darkMode}
          />
        </ChartParent>
      </>
    );
  }
}

export default withRouter(CoinPage);