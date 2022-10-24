import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { getGlobalInfo } from './store/Main/actions'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactComponent as Bitcoin } from "imgs/bitcoin.svg";
import { ReactComponent as Ethereum } from "imgs/ethereum.svg";
import { Coins, CoinPage, Portfolio } from 'pages';
import { NavComponent, NavCollapseComponent, ProgressBar } from 'components';
import { formatPercent, formatNum, useScreenSize } from 'utils/functionUtils';
import {
  AppBody,
  GlobalInfoContainer,
  GlobalInfoOne,
  GlobalInfoTwo,
  GlobalInfoThree,
  GlobalInfoFour,
  GlobalInfoFive,
  StyledImgBC,
  StyledImgEth
} from "styles";

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
  const isScreen = useScreenSize("767")
  useEffect(() => {
    props.getGlobalInfo()
    //eslint-disable-next-line
  }, [])
  
  return (
    <ThemeProvider theme={props.main.darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        {isScreen ? (
          <NavComponent />
        ) : (
          <NavCollapseComponent />
        )}
        <AppBody>
          <GlobalInfoContainer>
            <GlobalInfoOne>
              Conis {props.main.globalInfo.data?.active_cryptocurrencies}
            </GlobalInfoOne>
            <GlobalInfoTwo>
              &#x2022; {props.main.symbol}
              {formatNum(
                props.main.globalInfo.data?.total_market_cap[
                  `${props.main.currentCurrency}`
                ].toString()
              )}
            </GlobalInfoTwo>
            <GlobalInfoThree>
              &#x2022; {props.main.symbol}
              {formatNum(
                props.main.globalInfo.data?.total_volume[
                  `${props.main.currentCurrency}`
                ].toString()
              )}{" "}
              <ProgressBar
                progress={
                  (props.main.globalInfo.data?.total_volume[
                    `${props.main.currentCurrency}`
                  ] /
                    props.main.globalInfo.data?.total_market_cap[
                      `${props.main.currentCurrency}`
                    ]) *
                  100
                }
                width={"50px"}
                height={"13px"}
              />
            </GlobalInfoThree>
            <StyledImgBC>
              <Bitcoin />
            </StyledImgBC>
            <GlobalInfoFour>
              {formatPercent(
                props.main.globalInfo.data?.market_cap_percentage.btc.toFixed(0)
              ).toString()}{" "}
              <ProgressBar
                progress={props.main.globalInfo.data?.market_cap_percentage.btc}
                width={"50px"}
                height={"13px"}
              />
            </GlobalInfoFour>
            <StyledImgEth>
              <Ethereum />
            </StyledImgEth>
            <GlobalInfoFive>
              {formatPercent(
                props.main.globalInfo.data?.market_cap_percentage.eth.toFixed(0)
              ).toString()}{" "}
              <ProgressBar
                progress={props.main.globalInfo.data?.market_cap_percentage.eth}
                width={"50px"}
                height={"13px"}
              />
            </GlobalInfoFive>
          </GlobalInfoContainer>
          <Switch>
            <Route exact path="/coins" component={Coins} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/coins/:coinId" component={CoinPage} />
            <Redirect to="/coins" />
          </Switch>
          {props.main.savedCoinId && (
            <Redirect to={`/coins/${props.main.savedCoinId}`} />
          )}
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
    getGlobalInfo: () => dispatch(getGlobalInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);