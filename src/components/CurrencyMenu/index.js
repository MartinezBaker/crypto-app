import React from "react";
import { connect } from "react-redux"
import { changeCurrency } from "store/Main/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { StyledSelect, StyledSymbolSpan, StyledIconContainer, DropDownContainer } from "./styles";

const DropDownMenu = (props) => {
  return (
    <DropDownContainer>
      <div>
        <StyledSymbolSpan>{props.symbol}</StyledSymbolSpan>
      </div>
      <div>
        <StyledSelect value={props.main.currentCurrency} onChange={(e) => props.changeCurrency(e.target.value)}>
          <Options value="usd" name="USD" />
          <Options value="gbp" name="GBP" />
          <Options value="eur" name="EUR" />
          <Options value="btc" name="BTC" />
          <Options value="eth" name="ETH" />
        </StyledSelect>
      </div>
      <StyledIconContainer>
        <FontAwesomeIcon icon={faCaretDown} />
      </StyledIconContainer>
    </DropDownContainer>
  );
};
const Options = ({value, selected}) => {
  return(
    <option value={value}>{value?.toUpperCase()}{""}</option>
  )
};

const mapStateToProps = (state) =>({
  main: state.main
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (value) => dispatch(changeCurrency(value)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownMenu);