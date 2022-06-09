import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { currencyArry } from "utils/arrayUtils";
import { StyledSelect, StyledSymbolSpan, StyledIconContainer, DropDownContainer } from "./styles";

export const DropDownMenu = (props) => (
  <DropDownContainer>
    <div>
      <StyledSymbolSpan>{props.symbol}</StyledSymbolSpan>
    </div>
    <div>
      <StyledSelect
        onChange={(e) => props.handleChange(e)}
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