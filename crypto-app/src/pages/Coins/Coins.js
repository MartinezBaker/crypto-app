import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { setSortIcon } from 'utils/FontAwesomeutil'
import { CoinInstance } from "components";
import { TableContainer, TableHeader, Table, TableRow, SortButton } from './styles';


class Coins extends React.Component {
  state = {
    coins: [],
    page: 1,
    isLoading: false,
    hasMore: true,
    hasError: false,
    errMess: "",
    sort: {
      sortName: null,
      sortPrice: null,
      sortOneHour: null,
      sortTwentyFourHour: null,
      sortSevenDay: null
    }
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
      const nextPage = this.state.page + 1
      this.setState({
        page: nextPage,
        isLoading: true,
      });
      console.log(this.state.page)
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${nextPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      if(data === !![].length) {
        this.setState({hasMore: false})
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
  componentDidMount() {
    this.getCoins();
  }
  handleSort = (sortType) => {
    const newSort = Object.entries(this.state.sort).map((entry) => {
      const [key, value] = entry
      if(key === sortType) {
        return {
          [key]: value !== true ? true : false 
        }
      }else{
        return{
          [key]: null
        }
      }
    }).reduce((acc, element) => ({...acc, ...element}), {})
    this.setState({sort:newSort})
  }
  render() {
    let coinList = [...this.state.coins];
    const {sortName, sortPrice, sortOneHour, sortTwentyFourHour, sortSevenDay} = this.state.sort
    if (sortPrice === true) {
       coinList = coinList.sort((a, b) => a.current_price - b.current_price);
     }
     if (sortPrice === false) {
       coinList = coinList.sort((a, b) => b.price - a.price);
     }
     if (sortOneHour === true) {
       coinList = coinList.sort(
         (a, b) =>
           a.price_change_percentage_1h_in_currency -
           b.price_change_percentage_1h_in_currency
       );
     }
     if (sortOneHour === false) {
       coinList = coinList.sort(
         (a, b) =>
           b.price_change_percentage_1h_in_currency -
           a.price_change_percentage_1h_in_currency
       );
     }
     if (sortTwentyFourHour === true) {
       coinList = coinList.sort(
         (a, b) =>
           a.price_change_percentage_24h_in_currency -
           b.price_change_percentage_24h_in_currency
       );
     }
     if (sortTwentyFourHour === false) {
       coinList = coinList.sort(
         (a, b) =>
           b.price_change_percentage_24h_in_currency -
           a.price_change_percentage_24h_in_currency
       );
     }
     if (sortSevenDay === true) {
       coinList = coinList.sort(
         (a, b) =>
           a.price_change_percentage_7d_in_currency -
           b.price_change_percentage_7d_in_currency
       );
     }
     if (sortSevenDay === false) {
       coinList = coinList.sort(
         (a, b) =>
           b.price_change_percentage_7d_in_currency -
           a.price_change_percentage_7d_in_currency
       );
     }
    if (sortName === true) {
       coinList = coinList.sort((a, b) =>
        a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
      );
    }
    if (sortName === false) {
       coinList = coinList.sort((a, b) =>
        b.name.toUpperCase() < a.name.toUpperCase() ? -1 : 1
      );
    }
   
    
    return (
      <>
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
                    <SortButton onClick={() => this.handleSort("sortName")}>
                      {setSortIcon(sortName)}
                    </SortButton>
                  </TableHeader>
                  <TableHeader>
                    Price
                    <SortButton onClick={() => this.handleSort("sortPrice")}>
                      {setSortIcon(sortPrice)}
                    </SortButton>
                  </TableHeader>
                  <TableHeader>
                    1h%
                    <SortButton onClick={() => this.handleSort("sortOneHour")}>
                      {setSortIcon(sortOneHour)}
                    </SortButton>
                  </TableHeader>
                  <TableHeader>
                    24h%
                    <SortButton
                      onClick={() => this.handleSort("sortTwentyFourHour")}
                    >
                      {setSortIcon(sortTwentyFourHour)}
                    </SortButton>
                  </TableHeader>
                  <TableHeader>
                    7d%
                    <SortButton onClick={() => this.handleSort("sortSevenDay")}>
                      {setSortIcon(sortSevenDay)}
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