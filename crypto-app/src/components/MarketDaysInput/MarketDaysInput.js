import React from 'react';
import { StyledInput, StyledLabel, StyledMarketDay } from './styles';

const MarketDaysInput = (props) => (
  <StyledMarketDay>
    <StyledInput
      active={props.active}
      onClick={() => props.handleClick(props.value)}
      type="radio"
      id={props.id}
      name={props.name}
      value={props.value}
      checked={props.active && "checked"}
      autoFocus={props.active && "autoFocus"}
    />
    <StyledLabel htmlFor={props.id}>{props.value}</StyledLabel>
  </StyledMarketDay>
);

export default MarketDaysInput;