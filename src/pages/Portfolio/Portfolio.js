import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { showModal, getHistory, createPortfolioObj, deleteCoin, getCurrentInfo } from "../../store/Portfolio/actions";
import { changePath, openNav } from "../../store/Main/actions"
import { Modal }  from 'components'
import { SavedCoin } from "components"
import {
  StyledButton,
  ButtonContainer,
  ParentDiv,
  StyledButtonText,
} from "./styles";

const Portfolio = ({portfolio, main, getCurrentInfo, getHistory, createPortfolioObj, showModal, changePath, openNav}) => {
  const PrevIdRef = useRef(portfolio.idArry)
  const PrevSavedCoinsRef = useRef(portfolio.savedCoins)
  const PrevHistoryDataRef = useRef(portfolio.historyData)
  const id = portfolio.idArry[portfolio.idArry.length - 1];
  const location = useLocation();
  useEffect(() => {
    openNav();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if(location.pathname === "/portfolio"){
      changePath(location.pathname)
    }
  }, [location, changePath])
  useEffect(() => {
     if(PrevIdRef.current !== portfolio.idArry){
      getHistory(id);
      getCurrentInfo(portfolio.idArry);
      PrevIdRef.current = portfolio.idArry
    }
  }, [getCurrentInfo, getHistory, portfolio.idArry, id]);
  useEffect(() => {
    if(PrevSavedCoinsRef.current !== portfolio.savedCoins && PrevHistoryDataRef.current !== portfolio.historyData) {
      createPortfolioObj(id, main.currentCurrency);
      PrevSavedCoinsRef.current =  portfolio.savedCoins
      PrevHistoryDataRef.current = portfolio.historyData
    }
  }, [createPortfolioObj, portfolio.savedCoins, portfolio.historyData, main.currentCurrency, id])
  return (
    <ParentDiv>
      <ButtonContainer>
        <StyledButton onClick={() => showModal()}>
          <StyledButtonText>Add Asset</StyledButtonText>
        </StyledButton>
      </ButtonContainer>
      <Modal />
      {portfolio.portfolio.map((coin) => (
        <SavedCoin
          key={coin.id}
          id={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          image={coin.image}
          amount={coin.amount}
          date={coin.date}
          priceAtPurchase={coin.priceAtPurchase}
        />
      ))}
    </ParentDiv>
  );
}
const mapStateToProps = (state) => ({
   portfolio: state.portfolio,
   coins : state.coins,
   main: state.main
 });
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    getHistory: (id) => dispatch(getHistory(id)),
    createPortfolioObj: (id, currency) =>
      dispatch(createPortfolioObj(id, currency)),
    getCurrentInfo: (arry) => dispatch(getCurrentInfo(arry)),
    deleteCoin: (coin) => dispatch(deleteCoin(coin)),
    changePath: (path) => dispatch(changePath(path)),
    openNav: () => dispatch(openNav())
  };
 }
 
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)