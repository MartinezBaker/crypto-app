import React from 'react';
import useState from 'react-usestateref'
import { connect } from 'react-redux'
import { showModal, saveCoinObj } from 'store/Portfolio/actions';
import { ReactComponent as Close } from "imgs/x-mark.svg";
import { CurrencyNameInput, AmountInput, DateInput } from 'components/ModalInput';
import {
  StyledModal,
  ModalContent,
  ModalHeaderContainer,
  ModalHeader,
  CloseButtonsContainer,
  StyledButtons,
  StyledIcon,
  ModalBody,
  StyledInstructions,
  StyledListItem,
  StyledList,
  StyledInputContainer,
  StyledParagraph,
  StyledForm,
  ImgOutterContainer,
  ImgInnerContainer,
  CoinNameParent,
  StyledImg,
 } from "./styles";

const Modal = (props) => {
  const [nameValue, setNameValue] = useState("")
  const [amountValue, setAmountValue] = useState("")
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().slice(0, 10)
  );
 
  const handleChange = (value, valueName) => {
    if(valueName === "Coin Name..."){
      return setNameValue(value)
    }else if (valueName === "Amount Owned..."){
      return setAmountValue(value)
    }else{
      return setDateValue(value)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    props.saveCoinObj(nameValue, amountValue, dateValue);
    props.showModal()
    setNameValue("")
    setAmountValue("")
    setDateValue(new Date().toISOString().slice(0, 10));
  }
  const nameList = props.coins.coins?.filter(
    (coin) =>
      nameValue &&
      coin.name.toLowerCase().includes(nameValue.toLowerCase())
  );
  const limitedNameList = nameList?.slice(0,9)
  const findCoin = props.coins.coins?.find((coin) => coin.name === nameValue)
  const filteredCoin = props.coins.coins?.filter((coin) => nameValue ? coin.name === nameValue : null )
  const name = filteredCoin?.[0]?.name
  const thumbNail = filteredCoin?.[0]?.image
  const symbol = filteredCoin?.[0]?.symbol?.toUpperCase()
  if(!props.portfolio.showModal){
    return null
  }
  return (
    <StyledModal show={props.portfolio.showModal}>
      <ModalContent>
        <ModalHeaderContainer>
          <ModalHeader>
            Select Coins
            <StyledIcon onClick={() => props.showModal()}>
              <Close />
            </StyledIcon>
          </ModalHeader>
        </ModalHeaderContainer>
        <ModalBody>
          <StyledInstructions>
            {findCoin ? (
              <div>
                <ImgOutterContainer>
                  <ImgInnerContainer>
                    {thumbNail && <StyledImg src={thumbNail} alt="Coin" />}
                  </ImgInnerContainer>
                  <CoinNameParent>
                    {name && <div>{`${name} (${symbol})`}</div>}
                  </CoinNameParent>
                </ImgOutterContainer>
              </div>
            ) : (
              <StyledList>
                <StyledListItem>
                  Type coin name, then select from dropdown
                </StyledListItem>
                <StyledListItem> Type amount owned (default: 0)</StyledListItem>
                <StyledListItem>
                  Type date purchased (default: today)
                </StyledListItem>
              </StyledList>
            )}
          </StyledInstructions>
          <StyledInputContainer>
            <StyledForm id="modalForm" onSubmit={handleSubmit}>
              <CurrencyNameInput
                name="Coin Name..."
                type="text"
                handleChange={handleChange}
                limitedList={limitedNameList}
              />
              <AmountInput
                name="Amount Owned..."
                type="text"
                handleChange={handleChange}
              />
              <DateInput
                name="date"
                type="date"
                value={new Date().toISOString().slice(0, 10)}
                handleChange={handleChange}
                max={new Date().toISOString().slice(0, 10)}
              />
            </StyledForm>
          </StyledInputContainer>
        </ModalBody>
        <StyledParagraph>
          **If you submit a coin already in your inventory it will overwrite
          previous data.
        </StyledParagraph>
        <CloseButtonsContainer>
          <StyledButtons
            name="Close"
            onClick={() => props.showModal()}
            background="white"
            width="150px"
          >
            Close
          </StyledButtons>
          <StyledButtons
            width="200px"
            form="modalForm"
            type="submit"
            value="Submit"
          >
            Save and Close
          </StyledButtons>
        </CloseButtonsContainer>
      </ModalContent>
    </StyledModal>
    
  );
}

const mapStateToProps = (state) => ({
  portfolio: state.portfolio,
  main: state.main,
  coins: state.coins
})
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    saveCoinObj: (nameValue, amount, date) =>
      dispatch(saveCoinObj(nameValue, amount, date)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);