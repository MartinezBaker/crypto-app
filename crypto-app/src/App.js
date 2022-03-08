import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';
import Coins from '../src/pages/Coins/index';
import Portfolio from '../src/pages/Portfolio/index';
import './App.css';

class App extends React.Component {
  render() {

    const CoinWithId = ({match}) => {
      <></>
    }
    return (
      <div className="App">
        <Router>
          <nav>
            <Link to="/coins">Coins</Link> {""}
            <Link to="/portfolio">Portfolio</Link>
          </nav>
          <Switch>
            <Route exact path="/coins" component={Coins} />
            <Route exact path="/coins/:coinId" component={CoinWithId} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Redirect to="/coins" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
