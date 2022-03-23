import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { Coins, CoinPage, Portfolio } from 'pages';
import { AppBody }  from 'styles';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <nav>
            <Link to="/coins">Coins</Link> {""}
            <Link to="/portfolio">Portfolio</Link>
          </nav>
          <AppBody>
            <Switch>
              <Route exact path="/coins" component={Coins} />
              <Route exact path="/coins/:coinId" component={CoinPage} />
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
