import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { LineChart, BarChart } from 'components/Charts'
import { setSortIcon } from 'utils/FontAwesomeutil'
import { sort, getTodaysDate, formatChartData, formatToolTipDate } from 'utils/functionUtils'
import { marketDaysArr } from 'utils/arrayUtils';
import { CoinInstance, Button } from "components";
import { TableContainer, TableHeader, Table, TableRow, SortButton,  LineChartContainer, BarChartContainer, ChartParent, PriceText, SubText, TextContainer, ParnetDiv, MarketDaysParent, TitleParent, TitleChild, TableTitleContainer, TableTitle1, TableTitle2 } from './styles';

class Coins extends React.Component {
  state = {
    coins: [],
    page: 1,
    isLoading: false,
    hasMore: true,
    hasError: false,
    errMessage: "",
    chartData: {},
    currency: "usd",
    marketDays: 29,
    interval: "daily",
    sortBy: "BY MARKET CAP",
    sort: {
      name: null,
      current_price: null,
      price_change_percentage_1h_in_currency: null,
      price_change_percentage_24h_in_currency: null,
      price_change_percentage_7d_in_currency: null,
    },
  };
  getCoins = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      this.setState({
        coins: data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        hasError: true,
        errMessage: "There was a problem getting coin list!",
      });
    }
  };
  getMoreCoins = async () => {
    try {
      const nextPage = this.state.page + 1;
      this.setState({
        page: nextPage,
        isLoading: true,
      });
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${nextPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      if (!data.length) {
        this.setState({ hasMore: false });
      }
      const addCoins = [...this.state.coins, ...data];
      this.setState({
        coins: addCoins,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        hasError: true,
        errMessage: "Could not load more coins!",
      });
    }
  };
  getChartData = async () => {
    try {
      const currency = this.state.currency
      const marketDays =  this.state.marketDays
      const interval = this.state.interval
      this.setState({isLoading: true})
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${marketDays}&interval=${interval}`)
      this.setState({ isLoading: false, chartData: data})
    } catch (error) {
      this.setState({ isLoading: false, hasError: true, errMessage: "Could Not Load Chart Data!"})
    }
  }
  componentDidMount() {
    this.getCoins();
    this.getChartData();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.marketDays !== this.state.marketDays){
       this.getChartData()
    }
  }
  handleTopSortClick = () => {
    const {sortBy} = this.state
    if(sortBy === "BY MARKET CAP") {
      this.setState({sortBy: "BY VOLUME" })
    }else {
      this.setState({ sortBy: "BY MARKET CAP" });
    }
  }
  handleSort = (sortType) => {
    const newSort = Object.entries(this.state.sort)
      .map((entry) => {
        const [key, value] = entry;
        if (key === sortType) {
          return {
            [key]: value !== true
          };
        } else {
          return {
            [key]: null,
          };
        }
      })
      .reduce((acc, element) => ({ ...acc, ...element }), {});
    this.setState({ sort: newSort });
  };
  handleClick = (name) => {
    const marketDaysObj = {
      "1d": 1,
      "1w": 6,
      "1m": 29,
      "3m": 89,
      "6m": 179,
      "1y": 364
    }
    Object.entries(marketDaysObj).map((entry) => {
      const [key, value] = entry
      if(key === name){
        return this.setState({marketDays: value})
      }else {
        return null
      }
      
    })
  }
  render() {
    const {marketDays, chartData, sortBy} = this.state
    const lineChartLabels = chartData.prices && formatChartData(chartData.prices, 0);
    const lineChartData = chartData.prices && formatChartData(chartData.prices, 1);
    const barChartLabels = chartData.total_volumes && formatChartData(chartData.total_volumes, 0);
    const barChartData = chartData.total_volumes && formatChartData(chartData.total_volumes, 1);
    let coinList = [...this.state.coins]
    if(sortBy === "BY MARKET CAP") {
       coinList = coinList.sort((a, b) => b.market_cap - a.market_cap);
    }
    if(sortBy === "BY VOLUME") {
       coinList = coinList.sort((a, b) => b.total_volume - a.total_volume);
    }
    const {name, current_price, price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency} = this.state.sort
    coinList = coinList.sort(sort(name, "name"))
    coinList = coinList.sort(sort(current_price, "current_price"))
    coinList = coinList.sort(sort(price_change_percentage_1h_in_currency, "price_change_percentage_1h_in_currency"))
    coinList = coinList.sort(sort(price_change_percentage_24h_in_currency, "price_change_percentage_24h_in_currency"));
    coinList = coinList.sort(sort(price_change_percentage_7d_in_currency, "price_change_percentage_7d_in_currency"))
    return (
      <>
        <ParnetDiv>
          <TitleParent>
            <TitleChild>Overview</TitleChild>
          </TitleParent>
          <ChartParent>
            <LineChartContainer>
              {this.state.isLoading || this.state.hasError ? (
                <div></div>
              ) : (
                <TextContainer>
                  <SubText>Price</SubText>
                  <PriceText>
                    {lineChartData &&
                      "$" +
                        (lineChartData[lineChartData.length - 1] / 1e3).toFixed(
                          2
                        ) +
                        "K"}
                  </PriceText>
                  <SubText>{getTodaysDate()}</SubText>
                </TextContainer>
              )}
              <LineChart
                data={lineChartData}
                labels={lineChartLabels}
                priceTimeArry={chartData.prices}
                errMessage={this.state.errMessage}
                isLoading={this.state.isLoading}
                hasError={this.state.hasError}
              />
            </LineChartContainer>
            <BarChartContainer>
              {this.state.isLoading || this.state.hasError ? (
                <div></div>
              ) : (
                <TextContainer>
                  <SubText>Volume 24h</SubText>
                  <PriceText>
                    {barChartData &&
                      "$" +
                        (barChartData[barChartData.length - 1] / 1e9).toFixed(
                          2
                        ) +
                        "B"}
                  </PriceText>
                  <SubText>{getTodaysDate()}</SubText>
                </TextContainer>
              )}
              <BarChart
                days={marketDays}
                data={barChartData}
                labels={barChartLabels}
                volTimeArry={chartData.total_volumes}
                errMessage={this.state.errMessage}
                isLoading={this.state.isLoading}
                hasError={this.state.hasError}
              />
            </BarChartContainer>
          </ChartParent>
          <MarketDaysParent>
            {marketDaysArr.map((days) => (
              <Button
                key={days.name}
                name={days.name}
                active={marketDays === days.numDays}
                handleClick={this.handleClick}
              />
            ))}
          </MarketDaysParent>
          <TableContainer>
            <TableTitleContainer>
              <TableTitle1>TOP {this.state.coins.length}</TableTitle1><TableTitle2>{sortBy}</TableTitle2><SortButton onClick={this.handleTopSortClick}><FontAwesomeIcon icon={faCaretDown} style={{marginLeft: "5px"}} /></SortButton>
            </TableTitleContainer>
            <InfiniteScroll
              dataLength={coinList.length}
              next={this.getMoreCoins}
              hasMore={this.state.hasMore}
              loader={
                (this.state.isLoading && <h4>Loading...</h4>) || (
                  <h4>{this.state.errMessage}</h4>
                )
              }
            >
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>#</TableHeader>
                    <TableHeader>
                      Name
                      <SortButton onClick={() => this.handleSort("name")}>
                        {setSortIcon(name)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      Price
                      <SortButton
                        onClick={() => this.handleSort("current_price")}
                      >
                        {setSortIcon(current_price)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      1h%
                      <SortButton
                        onClick={() =>
                          this.handleSort(
                            "price_change_percentage_1h_in_currency"
                          )
                        }
                      >
                        {setSortIcon(price_change_percentage_1h_in_currency)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      24h%
                      <SortButton
                        onClick={() =>
                          this.handleSort(
                            "price_change_percentage_24h_in_currency"
                          )
                        }
                      >
                        {setSortIcon(price_change_percentage_24h_in_currency)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      7d%
                      <SortButton
                        onClick={() =>
                          this.handleSort(
                            "price_change_percentage_7d_in_currency"
                          )
                        }
                      >
                        {setSortIcon(price_change_percentage_7d_in_currency)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>24h Vol/Market Cap</TableHeader>
                    <TableHeader>Circulating/Total Sup</TableHeader>
                    <TableHeader>Last 7d</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {(coinList.length &&
                    coinList.map((coin) => (
                      <CoinInstance
                        key={coin.id}
                        name={coin.name}
                        price={
                          coin.current_price < 1e3
                            ? coin.current_price.toString()
                            : coin.current_price.toLocaleString()
                        }
                        image={coin.image}
                        symbol={coin.symbol.toUpperCase()}
                        oneHour={coin.price_change_percentage_1h_in_currency?.toString()}
                        twentyFourHour={coin.price_change_percentage_24h_in_currency?.toString()}
                        sevenDay={coin.price_change_percentage_7d_in_currency?.toString()}
                        totalVolume={coin.total_volume}
                        marketCap={coin.market_cap.toString()}
                        totalVolPercentage={
                          (coin.total_volume / coin.market_cap) * 100
                        }
                        circulatingSupply={coin.circulating_supply}
                        totalSupply={coin.total_supply}
                        circulatingSupplyPercentage={
                          (coin.circulating_supply / coin.total_supply) * 100
                        }
                        sparkLine={coin.sparkline_in_7d}
                      />
                    ))) ||
                    this.props.errMessage}
                </tbody>
              </Table>
            </InfiniteScroll>
          </TableContainer>
        </ParnetDiv>
      </>
    );
  }
}

export default Coins;