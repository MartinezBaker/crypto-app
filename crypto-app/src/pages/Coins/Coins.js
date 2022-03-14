import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { CoinInstance } from "components";
import { TableContainer, TableHeader, Table, TableRow } from './styles';

class Coins extends React.Component {
  state = {
    coins:[],
    page: 1,
    isLoading: false,
    hasMore: true,
    hasError: false,
    errMess: ""
  }
  getCoins = async () => {
    try {
      this.setState({
        isLoading: true
      })
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      this.setState({
        coins: data,
        isLoading: false,
      });
    } catch(error) {
      this.setState({
        isLoading: false,
        hasError: true,
        errMess: "There was a problem getting coin list!"
      })
    }
  }
  getMoreCoins = async () => {
    try {
      if (this.state.coins.length >= 1800) {
        this.setState({ hasMore: false });
        return;
      }
      this.setState({
        page: this.state.page + 1,
        isLoading: true,
      });
      const  { data }  = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${this.state.page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      const addCoins = [...this.state.coins, ...data]
      setTimeout(() => {
        this.setState({
          coins: addCoins,
          isLoading: false
        })
      }, 500)
    }catch(error){
      this.setState({isLoading: false, errMess:"Could not load more coins!"})
    }
  }
  componentDidMount() {
      this.getCoins()
  }
  render(){
    return (
      <>
        <TableContainer>
          <InfiniteScroll
            dataLength={this.state.coins.length}
            next={this.getMoreCoins}
            hasMore={this.state.hasMore}
            loader={(this.state.isLoading && <h4>Loading...</h4>) || <h4>{this.state.errMess}</h4>}
          >
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>#</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>1h%</TableHeader>
                  <TableHeader>24h%</TableHeader>
                  <TableHeader>7d%</TableHeader>
                  <TableHeader>24hr Volume/Market Cap</TableHeader>
                  <TableHeader>Circulating/Total Supply</TableHeader>
                  <TableHeader>Last 7d</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {(this.state.coins && this.state.coins.map((coin) => (
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
                    sevenDay={coin.price_change_percentage_7d_in_currency?.toString() }
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
                ))) || <h4>{this.props.errMess}</h4>}
              </tbody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </>
    );
  }
}

export default Coins;