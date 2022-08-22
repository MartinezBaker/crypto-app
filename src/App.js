import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { darkModeClick, getGlobalInfo } from './store/Main/actions'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactComponent as DarkMode } from "imgs/contrast-dark.svg";
import { Coins, CoinPage, Portfolio } from 'pages';
import { NavSearch, ProgressBar } from 'components';
import { formatPercent, formatNum } from 'utils/functionUtils';
import DropDownMenu from './components/CurrencyMenu/index'
import { AppBody, StyledNav, StyledNavChild, SVGContainer, StyledButton, StyledLinkContainer, GlobalInfoContainer, GlobalInfo, StyledImg }  from 'styles';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Poppins, sans-serif;
    background-color: ${(props) => props.theme.body};
  };
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
  useEffect(() => {
    props.getGlobalInfo()
    //eslint-disable-next-line
  }, [])
  return (
    <ThemeProvider theme={props.main.darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <StyledNav>
          <StyledNavChild>
            <StyledLinkContainer active={props.main.path === "/coins" ? true : null}>
              <Link
                style={{
                  textDecoration: "none",
                  color: props.main.darkMode ? "white" : "black",
                }}
                to="/coins"
              >
                Coins
              </Link>{" "}
              {""}
            </StyledLinkContainer>
            <StyledLinkContainer active={props.main.path === "/portfolio" ? true : null}>
              <Link
                style={{
                  textDecoration: "none",
                  color: props.main.darkMode ? "white" : "black",
                }}
                to="/portfolio"
              >
                Portfolio
              </Link>
            </StyledLinkContainer>
          </StyledNavChild>
          <StyledNavChild>
            <NavSearch />
            <DropDownMenu symbol={props.main.symbol} />
            <StyledButton onClick={() => props.darkModeClick()}>
              <SVGContainer>
                <DarkMode />
              </SVGContainer>
            </StyledButton>
          </StyledNavChild>
        </StyledNav>
        <AppBody>
          <GlobalInfoContainer>
            <GlobalInfo>Conis {props.main.globalInfo.data?.active_cryptocurrencies}</GlobalInfo>
            <GlobalInfo>&#x2022;{" "}{props.main.symbol}{formatNum(props.main.globalInfo.data?.total_market_cap[`${props.main.currentCurrency}`].toString())}</GlobalInfo>
            <GlobalInfo>&#x2022;{" "}{props.main.symbol}{formatNum(props.main.globalInfo.data?.total_volume[`${props.main.currentCurrency}`].toString())}{" "}<ProgressBar progress={(props.main.globalInfo.data?.total_volume[`${props.main.currentCurrency}`] / props.main.globalInfo.data?.total_market_cap[`${props.main.currentCurrency}`]) * 100} width={"50px"} height={"13px"} /></GlobalInfo>
            <StyledImg alt="Coin" src={props.coins.coins[0]?.image} />
            <GlobalInfo>{(formatPercent(props.main.globalInfo.data?.market_cap_percentage.btc.toFixed(0)).toString())}{" "}<ProgressBar progress={props.main.globalInfo.data?.market_cap_percentage.btc} width={"50px"} height={"13px"} /></GlobalInfo>
            <StyledImg alt="Coin" src={props.coins.coins[1]?.image} />
            <GlobalInfo>{(formatPercent(props.main.globalInfo.data?.market_cap_percentage.eth.toFixed(0)).toString())}{" "}<ProgressBar progress={props.main.globalInfo.data?.market_cap_percentage.eth} width={"50px"} height={"13px"} /></GlobalInfo>
          </GlobalInfoContainer>
          <Switch>
            <Route exact path="/coins" component={Coins} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/coins/:coinId" component={CoinPage} />
            <Redirect to="/coins" />
          </Switch>
          {props.main.savedCoinId && <Redirect to={`/coins/${props.main.savedCoinId}`} />}
        </AppBody>
      </Router>
    </ThemeProvider>
  );
}
const mapStateToProps = (state) => ({
  main: state.main,
  coins: state.coins
});
const mapDispatchToProps = (dispatch) => {
  return{
    darkModeClick: () => dispatch(darkModeClick()),
    getGlobalInfo: () => dispatch(getGlobalInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);