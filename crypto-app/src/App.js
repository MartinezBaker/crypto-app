import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { ReactComponent as DarkMode } from "imgs/contrast-dark.svg";
import { Coins, CoinPage, Portfolio } from 'pages';
import { DropDownMenu } from 'components/CurrencyMenu';
import { AppBody, StyledNav, StyledNavChild, SVGContainer, StyledButton, FullBody }  from 'styles';


class App extends React.Component {
  state = { 
    currentCurrency: "usd",
    symbol: "$",
    darkMode: true
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
  handleClick = () => {
    this.setState({darkMode: !this.state.darkMode})
  }
  render() {
    return (
      <FullBody darkMode={this.state.darkMode}>
        <Router>
          <StyledNav>
            <StyledNavChild>
              <Link to="/coins">Coins</Link> {""}
              <Link to="/portfolio">Portfolio</Link>
            </StyledNavChild>
            <StyledNavChild>
              <DropDownMenu
                symbol={this.state.symbol}
                handleChange={this.handleChange}
                darkMode={this.state.darkMode}
              />
              <StyledButton
                darkMode={this.state.darkMode}
                onClick={this.handleClick}
              >
                <SVGContainer darkMode={this.state.darkMode}>
                  <DarkMode />
                </SVGContainer>
              </StyledButton>
            </StyledNavChild>
          </StyledNav>
          <AppBody darkMode={this.state.darkMode}>
            <Switch>
              <Route
                exact
                path="/coins"
                render={() => (
                  <Coins
                    symbol={this.state.symbol}
                    currency={this.state.currentCurrency}
                    darkMode={this.state.darkMode}
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
                    darkMode={this.state.darkMode}
                  />
                )}
              />
              <Route exact path="/portfolio" component={Portfolio} />
              <Redirect to="/coins" />
            </Switch>
          </AppBody>
        </Router>
      </FullBody>
    );
  }
}

export default App;