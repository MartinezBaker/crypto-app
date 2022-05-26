import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { currencyArry } from "utils/arrayUtils";
import { StyledSelect, StyledSymbolContainer, StyledSymbolSpan, StyledIconContainer } from "./styles";

export const DropDownMenu = (props) => (
  <div>
    <StyledSymbolContainer darkMode={props.darkMode}>
      <StyledSymbolSpan>{props.symbol}</StyledSymbolSpan>
    </StyledSymbolContainer>
    <StyledSelect
      darkMode={props.darkMode}
      id="currency"
      name="currency"
      onChange={(e) => props.handleChange(e)}
    >
      {currencyArry.map((currency) => (
        <Options key={currency} value={currency} />
      ))}
    </StyledSelect>
    <StyledIconContainer darkMode={props.darkMode}>
      <FontAwesomeIcon icon={faCaretDown} />
    </StyledIconContainer>
  </div>
);

const Options = (props) => (
  <option value={props.value}>{props.value?.toUpperCase()}{""}</option>
);