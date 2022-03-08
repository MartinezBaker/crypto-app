import React from 'react';
import { CoinInstance } from "../../componets/CoinInstance/index";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';


class Coins extends React.Component {
    state = {
        coins:[],
        page: 1,
        isLoading: false,
        hasError: false,
        errMess: ""
    }
    getCoins = async () => {
        try {
          this.setState({
              ...this.state,
              isLoading: true
          })
          const { data } = await axios(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
          );
          
          this.setState({
            ...this.state,
            coins: data,
            isLoading: false,
          });
        } catch(error) {
            this.setState({
                ...this.state,
                isLoading: false,
                hasError: true,
                errMess: "There was a problem getting coin list!"
                
            })
            

        }
    }

    getMoreCoins = async () => {
      try {
        this.setState({
          ...this.state,
          page: this.state.page + 1,
          isLoading: true,
        });
        const  { data }  = await axios(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${this.state.page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        const addCoins = [...this.state.coins, ...data]
        setTimeout(() => {
          this.setState({
            ...this.state,
            coins: addCoins,
            isLoading: false
          })
        }, 500)
      }catch(error){
        this.setState({errMess:"Could not load more coins!"})
      }
    }
    componentDidMount() {
        this.getCoins()
    }
    render(){
      
      return (
        <>
          <div className='table-container'>
            <InfiniteScroll
              dataLength={this.state.coins.length}
              next={this.getMoreCoins}
              hasMore={true}
              loader={this.state.isLoading && <h4>Loading...</h4>}
            >
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>1h%</th>
                    <th>24h%</th>
                    <th>7d%</th>
                    <th>24hr Volume/Market Cap</th>
                    <th>Circulating/Total Supply</th>
                    <th>Last 7d</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.coins.map((coin) => (
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
                      oneHour={
                        coin.price_change_percentage_1h_in_currency === null
                          ? null
                          : coin.price_change_percentage_1h_in_currency.toString()
                      }
                      twentyFourHour={
                        coin.price_change_percentage_24h_in_currency === null
                          ? null
                          : coin.price_change_percentage_24h_in_currency.toString()
                      }
                      sevenDay={
                        coin.price_change_percentage_7d_in_currency === null
                          ? null
                          : coin.price_change_percentage_7d_in_currency.toString()
                      }
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
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        </>
      );
    }
}

export default Coins;