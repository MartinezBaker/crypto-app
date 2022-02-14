import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/coin/:coinId" component={Coin} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Redirect to="/home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
