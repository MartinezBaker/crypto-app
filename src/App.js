import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactComponent as DarkMode } from "imgs/contrast-dark.svg";
import { Coins, CoinPage, Portfolio } from 'pages';
import { DropDownMenu } from 'components/CurrencyMenu';
import { AppBody, StyledNav, StyledNavChild, SVGContainer, StyledButton }  from 'styles';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Poppins, sans-serif;
    background-color: ${(props) => props.theme.body}
  }
`;
const darkTheme = {
  body: "rgb(25, 27, 31)",
  app: "rgb(31, 33, 40)",
  button: "rgb(44, 47, 54)",
  chart: "rgb(0, 252, 42)",
  text: "white",
  buttonFocus: "rgba(0, 252, 42, 0.3)",
  svg: "invert(1)",
  modalButtonMain: "rgb(0, 252, 42)",
  modalButtonSecondary: "white",
  showModalHover: "rgb(44, 47, 54)",
  showModalHoverBorder: "white",
};
const lightTheme = {
  body: "rgb(255, 255, 255)",
  app: "rgb(247, 247, 247)",
  button: "rgb(237, 239, 242)",
  chart: "#0275d8",
  text: "black",
  buttonFocus: "rgba(2, 117, 216, 0.3)",
  svg: "invert(0)",
  modalButtonMain: "black",
  modalButtonSecondary: "black",
  showModalHover: "rgb(237, 239, 242)",
  showModalHoverBorder: "black",
};

const App = () => {
  const [currentCurrency, setCurrentCurrency] = useState("usd")
  const [symbol, setSymbol] = useState("$")
  const [darkMode, setDarkMode] = useState(true)
  
  const handleChange = (e) => {
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
        return setCurrentCurrency(key) && setSymbol(value) 
      }else{
        return null
      }
    })
  }
  const handleClick = () => {
    setDarkMode(!darkMode)
  }
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <StyledNav>
          <StyledNavChild>
            <Link to="/coins">Coins</Link> {""}
            <Link to="/portfolio">Portfolio</Link>
          </StyledNavChild>
          <StyledNavChild>
            <DropDownMenu
              symbol={symbol}
              handleChange={handleChange}
            />
            <StyledButton
              onClick={handleClick}
            >
              <SVGContainer >
                <DarkMode />
              </SVGContainer>
            </StyledButton>
          </StyledNavChild>
        </StyledNav>
        <AppBody>
          <Switch>
            <Route
              exact
              path="/coins"
              render={() => (
                <Coins
                  symbol={symbol}
                  currency={currentCurrency}
                  darkMode={darkMode}
                />
              )}
            />
            <Route
              exact
              path="/coins/:coinId"
              render={(props) => (
                <CoinPage
                  symbol={symbol}
                  currency={currentCurrency}
                  darkMode={darkMode}
                  />
              )}
            />
            <Route exact path="/portfolio" component={Portfolio} />
            <Redirect to="/coins" />
          </Switch>
        </AppBody>
      </Router>
    </ThemeProvider>
  );
}

export default App;