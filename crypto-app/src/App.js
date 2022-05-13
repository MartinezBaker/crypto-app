import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { Coins, CoinPage, Portfolio } from 'pages';
import { DropDownMenu } from 'components/CurrencyMenu'
import { AppBody }  from 'styles';

class App extends React.Component {
  state = { 
    currentCurrency: "usd",
    symbol: "$"
  }
  handleChange = (e) => {
    const currency = e.target.value
    const currObj = {
      "usd": "$",
      "gbp": "£",
      "eur": "€",
      "btc": "₿",
      "eth": "Ξ",
    };
    Object.entries(currObj).map((entry) => {
      const [key, value] = entry
      if(key === currency){
        return this.setState({currentCurrency: key, symbol: value})
      }else{
        return null
      }
    })
  }
  render() {
    return (
      <div className="App">
        <Router>
          <nav>
            <Link to="/coins">Coins</Link> {""}
            <Link to="/portfolio">Portfolio</Link>
            <DropDownMenu
              symbol={this.state.symbol}
              handleChange={this.handleChange}
            />
          </nav>
          <AppBody>
            <Switch>
              <Route
                exact
                path="/coins"
                render={() => (
                  <Coins
                    symbol={this.state.symbol}
                    currency={this.state.currentCurrency}
                  />
                )}
              />
              <Route
                exact
                path="/coins/:coinId"
                render={(props) => (
                  <CoinPage
                    symbol={this.state.symbol}
                    currency={this.state.currentCurrency}
                  />
                )}
              />
              <Route exact path="/portfolio" component={Portfolio} />
              <Redirect to="/coins" />
            </Switch>
          </AppBody>
        </Router>
      </div>
    );
  }
}

export default App;