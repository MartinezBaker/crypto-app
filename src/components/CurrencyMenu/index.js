import React from "react";
import { connect } from "react-redux"
import { changeCurrency } from "store/Main/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { currencyArry } from "utils/arrayUtils";
import { StyledSelect, StyledSymbolSpan, StyledIconContainer, DropDownContainer } from "./styles";

const DropDownMenu = (props) => (
  <DropDownContainer>
    <div>
      <StyledSymbolSpan>{props.symbol}</StyledSymbolSpan>
    </div>
    <div>
      <StyledSelect
        onChange={(e) => props.changeCurrency(e.target.value)}
      >
        {currencyArry.map((currency) => (
          <Options key={currency} value={currency} />
        ))}
      </StyledSelect>
    </div>
    <StyledIconContainer>
      <FontAwesomeIcon icon={faCaretDown} />
    </StyledIconContainer>
  </DropDownContainer>
);
const Options = (props) => (
  <option value={props.value}>{props.value?.toUpperCase()}{""}</option>
);

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (value) => dispatch(changeCurrency(value)),
  };
};

export default connect(null, mapDispatchToProps)(DropDownMenu);