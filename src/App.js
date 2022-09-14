import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { darkModeClick, getGlobalInfo, openNav } from './store/Main/actions'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import BarLoader from "react-spinners/BarLoader";
import { ReactComponent as DarkMode } from "imgs/contrast-dark.svg";
import { ReactComponent as Nav } from "imgs/nav.svg";
import { Coins, CoinPage, Portfolio } from 'pages';
import { NavSearch, ProgressBar } from 'components';
import { formatPercent, formatNum, useScreenSize } from 'utils/functionUtils';
import DropDownMenu from './components/CurrencyMenu/index'
import {
  AppBody,
  StyledNav,
  StyledNavChild,
  SVGContainer,
  StyledButton,
  StyledLinkContainer,
  GlobalInfoContainer,
  GlobalInfoOne,
  GlobalInfoTwo,
  GlobalInfoThree,
  GlobalInfoFour,
  GlobalInfoFive,
  GlobalInfo,
  StyledImgBC,
  StyledSideBar,
  StyledNavButton,
  StyledCollapsedThemeButton,
  StyledCollapsedNav,
  NavSVGContainer,
  StyledImgEth,
  StyledHR,
  StyledCollapsedNavLink,
  StyledLink
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
  const handleClick = () => {
    props.openNav()
    props.darkModeClick()
  }
  return (
    <ThemeProvider theme={props.main.darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        {isScreen ? (
          <StyledNav>
            <StyledNavChild>
              <StyledLinkContainer
                active={props.main.path === "/coins" ? true : null}
              >
                <StyledLink to="/coins">Coins</StyledLink> {""}
              </StyledLinkContainer>
              <StyledLinkContainer
                active={props.main.path === "/portfolio" ? true : null}
              >
                <StyledLink to="/portfolio">Portfolio</StyledLink>
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
        ) : (
          <StyledCollapsedNav>
            <StyledNavChild>
              <NavSearch />
              <DropDownMenu symbol={props.main.symbol} />
            </StyledNavChild>
            {props.main.isOpen && (
              <StyledSideBar>
                <StyledCollapsedNavLink to="/coins">
                  Coins
                </StyledCollapsedNavLink>
                <StyledCollapsedNavLink to="/portfolio">
                  Portfolio
                </StyledCollapsedNavLink>
                <StyledHR />
                <StyledCollapsedThemeButton onClick={handleClick}>
                  Theme
                </StyledCollapsedThemeButton>
              </StyledSideBar>
            )}
            <div>
              <StyledNavButton onClick={() => props.openNav()}>
                <NavSVGContainer>
                  <Nav />
                </NavSVGContainer>
              </StyledNavButton>
            </div>
          </StyledCollapsedNav>
        )}
        <AppBody>
          <GlobalInfoContainer>
            {!props.coins.coins.length ? (
              <BarLoader loading={true} color={"rgb(0, 252, 42)"} width={150}/>
            ) : (
              <GlobalInfo>
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
                <StyledImgBC alt="Coin" src={props.coins?.coins[0]?.image} />
                <GlobalInfoFour>
                  {formatPercent(
                    props.main.globalInfo.data?.market_cap_percentage.btc.toFixed(
                      0
                    )
                  ).toString()}{" "}
                  <ProgressBar
                    progress={
                      props.main.globalInfo.data?.market_cap_percentage.btc
                    }
                    width={"50px"}
                    height={"13px"}
                  />
                </GlobalInfoFour>
                <StyledImgEth alt="Coin" src={props.coins?.coins[1]?.image} />
                <GlobalInfoFive>
                  {formatPercent(
                    props.main.globalInfo.data?.market_cap_percentage.eth.toFixed(
                      0
                    )
                  ).toString()}{" "}
                  <ProgressBar
                    progress={
                      props.main.globalInfo.data?.market_cap_percentage.eth
                    }
                    width={"50px"}
                    height={"13px"}
                  />
                </GlobalInfoFive>
              </GlobalInfo>
            )}
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
    darkModeClick: () => dispatch(darkModeClick()),
    getGlobalInfo: () => dispatch(getGlobalInfo()),
    openNav: () => dispatch(openNav())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);