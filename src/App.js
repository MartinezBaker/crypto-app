import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { darkModeClick } from './store/Main/actions'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactComponent as DarkMode } from "imgs/contrast-dark.svg";
import { Coins, CoinPage, Portfolio } from 'pages';
import DropDownMenu from './components/CurrencyMenu/index'
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

const App = (props) => {
  return (
    <ThemeProvider theme={props.main.darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <StyledNav>
          <StyledNavChild>
            <Link to="/coins">Coins</Link> {""}
            <Link to="/portfolio">Portfolio</Link>
          </StyledNavChild>
          <StyledNavChild>
            <DropDownMenu
              symbol={props.main.symbol}
            />
            <StyledButton onClick={() => props.darkModeClick()}>
              <SVGContainer>
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
              component={Coins}
            />
            <Route
              exact
              path="/coins/:coinId"
              component={CoinPage}
            />
            <Route exact path="/portfolio" component={Portfolio} />
            <Redirect to="/coins" />
          </Switch>
        </AppBody>
      </Router>
    </ThemeProvider>
  );
}
const mapStateToProps = (state) => ({
  main: state.main,
});
const mapDispatchToProps = (dispatch) => {
  return{
    darkModeClick: () => dispatch(darkModeClick())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);