import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { LineChart, BarChart } from 'components/Charts'
import { setSortIcon } from 'utils/FontAwesomeutil'
import { sort, getTodaysDate } from 'utils/utils'
import { CoinInstance } from "components";
import { TableContainer, TableHeader, Table, TableRow, SortButton,  LineChartContainer, BarChartContainer, ChartParent, PriceText, SubText, TextContainer } from './styles';

class Coins extends React.Component {
  state = {
    coins: [],
    page: 1,
    isLoading: false,
    hasMore: true,
    hasError: false,
    errMess: "",
    chartData: {},
    currency: "usd",
    marketDays: 30,
    interval: "daily",
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
        errMess: "There was a problem getting coin list!",
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
        errMess: "Could not load more coins!",
      });
    }
  };
  getChartData = async () => {
    try{
      const currency = this.state.currency
      const marketDays =  this.state.marketDays
      const interval = this.state.interval
      this.setState({isLoading: true})
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${marketDays}&interval=${interval}`)
      this.setState({ isLoading: false, chartData: data})
    }catch (error) {
      this.setState({ isLoading: false, hasError: true, errMess: "Could Not Load Chart Data!"})
    }
  }
  componentDidMount() {
    this.getCoins();
    this.getChartData();
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
  render() {
    const lineChartLabels = this.state.chartData.prices && this.state.chartData.prices.reduce((acc, element) => ([...acc, element[0]]), []).map((time) => {
      const date = new Date(time)
      return date.getDate()
    })
    const lineChartData = this.state.chartData.prices && this.state.chartData.prices.reduce((acc, element) => ([...acc, element[1]]), [])
    console.log(this.state.chartData)
    const barChartLabels = this.state.chartData.total_volumes && this.state.chartData.total_volumes.reduce((acc, element) => [...acc, element[0]], []).map((time) => {
      const date = new Date(time);
          return date.getDate();
        });
    const barChartData = this.state.chartData.total_volumes && this.state.chartData.total_volumes.reduce((acc, element) => ([...acc, element[1]]), []);
    console.log(barChartLabels)
    let coinList = [...this.state.coins]
    const {name, current_price, price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency} = this.state.sort
    coinList = coinList.sort(sort(name, "name"))
    coinList = coinList.sort(sort(current_price, "current_price"))
    coinList = coinList.sort(sort(price_change_percentage_1h_in_currency, "price_change_percentage_1h_in_currency"))
    coinList = coinList.sort(sort(price_change_percentage_24h_in_currency, "price_change_percentage_24h_in_currency"));
    coinList = coinList.sort(sort(price_change_percentage_7d_in_currency, "price_change_percentage_7d_in_currency"))
    return (
      <>
        <ChartParent>
          <LineChartContainer>
            <TextContainer><SubText>Price</SubText><PriceText>{lineChartData && "$" + (lineChartData[lineChartData.length - 1] / 1e3).toFixed(2) + "K"}</PriceText><SubText>{getTodaysDate()}</SubText></TextContainer>
            <LineChart data={lineChartData} labels={lineChartLabels} />
          </LineChartContainer>
          <BarChartContainer>
            <TextContainer><SubText>Price</SubText><PriceText>{barChartData && "$" + (barChartData[barChartData.length - 1] / 1e9).toFixed(2) + "B"}</PriceText><SubText>{getTodaysDate()}</SubText></TextContainer>
            <BarChart  data={barChartData} labels={barChartLabels} />
          </BarChartContainer>
        </ChartParent>
        <TableContainer>
          <InfiniteScroll
            dataLength={coinList.length}
            next={this.getMoreCoins}
            hasMore={this.state.hasMore}
            loader={
              (this.state.isLoading && <h4>Loading...</h4>) || (
                <h4>{this.state.errMess}</h4>
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
                  this.props.errMess}
              </tbody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </>
    );
  }
}

export default Coins;