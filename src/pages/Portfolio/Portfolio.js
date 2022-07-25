import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { showModal, getHistory, createPortfolioObj, getCoins, deleteCoin } from "../../store/Portfolio/actions";
import { Modal }  from 'components'
import { SavedCoin } from "components"
import {
  StyledButton,
  ButtonContainer,
  ParentDiv,
  StyledButtonText,
} from "./styles";

const Portfolio = ({portfolio, main, getCoins, coins, getHistory, createPortfolioObj, showModal}) => {
  useEffect(() => {
    getCoins()
  }, [getCoins, main.currentCurrency])
  const filteredCoin = coins?.coins?.filter(
    (coin) => coin.name.toLowerCase() === portfolio.savedCoins?.coinName?.toLowerCase()
  );
  const id = filteredCoin?.[0]?.id;
  const PrevSavedCoinsRef = useRef(portfolio.savedCoins)
  useEffect(() => {
    if(PrevSavedCoinsRef.current !== portfolio.savedCoins){
      getHistory(id)
      PrevSavedCoinsRef.current = portfolio.savedCoins
    }
  }, [portfolio.savedCoins, getHistory, id])
  const PrevHistoryDataRef = useRef(portfolio.historyData)
  useEffect(() => {
    if (
      PrevHistoryDataRef.current !== portfolio.historyData &&
      Object.values(portfolio.savedCoins).length
    ) {
      createPortfolioObj(id);
      PrevHistoryDataRef.current = portfolio.historyData;
    }
  }, [createPortfolioObj, id, portfolio.savedCoins, portfolio.historyData])
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
          amount={coin.amount}
          date={coin.date}
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
  return{
    showModal: () => dispatch(showModal()),
    getHistory: (id) => dispatch(getHistory(id)),
    createPortfolioObj: (id) => dispatch(createPortfolioObj(id)),
    getCoins: () => dispatch(getCoins()),
    deleteCoin: (coin) => dispatch(deleteCoin(coin))
  }
 }
 
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);