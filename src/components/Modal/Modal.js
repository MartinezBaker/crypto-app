import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import { connect } from 'react-redux'
import { showModal, saveCoinObj, getCoins } from 'store/Portfolio/actions';
import { ReactComponent as Close } from "imgs/x-mark.svg";
import { CurrencyNameInput } from 'components/ModalInput/ModalInput';
import { ModalInput } from 'components'
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
} from "./styles";

const CloseButtons = ({name, background, handleShowModal, width}) => (
    <StyledButtons width={width} name={name} background={background} onClick={handleShowModal}>{name}</StyledButtons>
)

const Modal = (props) => {
  const [nameValue, setNameValue] = useState("")
  const [amountValue, setAmountValue] = useState("")
  const [dateValue, setDateValue] = useState("")
 
  useEffect = (() => {
    this.props.getCoins()
    //eslint-disable-next-line
  }, [])
  
  const handleChange = (value, valueName) => {
    if(valueName === "Coin Name..."){
      return setNameValue(value)
    }else if (valueName === "Amount Owned..."){
      return setAmountValue(value)
    }else{
      return setDateValue(value)
    }
  }
  const nameList = props.portfolio.coinList?.filter(
    (coin) =>
      nameValue &&
      coin.name.toLowerCase().includes(nameValue.toLowerCase())
  );
  const limitedNameList = nameList?.slice(0,9)
  
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
          <div>
            <StyledInstructions>
              <StyledList>
                <StyledListItem>
                  Type coin name, then select from dropdown
                </StyledListItem>
                <StyledListItem> Type amount owned (default: 0)</StyledListItem>
                <StyledListItem>
                  Type date purchased (default: today)
                </StyledListItem>
              </StyledList>
            </StyledInstructions>
          </div>
          <StyledInputContainer>
            <StyledForm>
              <CurrencyNameInput
                  name="Coin Name..."
                  type="text"
                  handleChange={handleChange}
                  limitedList={limitedNameList}
                />
              <ModalInput
                name="Amount Owned..."
                type="text"
                handleChange={handleChange}
              />
              <ModalInput
                name="date"
                type="date"
                value={new Date().toISOString().slice(0, 10)}
                handleChange={handleChange}
              />
            </StyledForm>
          </StyledInputContainer>
        </ModalBody>
        <StyledParagraph>
          **If you submit a coin already in your inventory it will overwrite
          previous data.
        </StyledParagraph>
        <CloseButtonsContainer>
          <CloseButtons
            name="Close"
            handleShowModal={() => props.showModal()}
            background="white"
            width="150px"
          />
          <CloseButtons
            name="Save and Close"
            handleShowModal={() => props.showModal()}
            width="200px"
          />
        </CloseButtonsContainer>
      </ModalContent>
    </StyledModal>
  );
}

const mapStateToProps = (state) => ({
  portfolio: state.portfolio,
})
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    saveCoinObj: (nameValue, amount, date) =>
      dispatch(saveCoinObj(nameValue, amount, date)),
    getCoins: () => dispatch(getCoins()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);