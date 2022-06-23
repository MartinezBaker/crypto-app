import React from 'react';
import { connect } from "react-redux";
import { marketDaysClick } from 'store/CoinPage/actions';
import { StyledInput, StyledLabel, StyledMarketDay } from './styles';

const MarketDaysInput = (props) => (
  <StyledMarketDay>
    <StyledInput
      active={props.active}
      onClick={() => props.marketDaysClick(props.value)}
      type="radio"
      id={props.id}
      name={props.name}
      value={props.value}
      checked={props.active && "checked"}
      darkMode={props.darkMode}
      readOnly
    />
    <StyledLabel darkMode={props.darkMode} htmlFor={props.id}>{props.value}</StyledLabel>
  </StyledMarketDay>
);

const mapDispatchToProps = (dispatch) => {
  return {
    marketDaysClick: (value) => dispatch(marketDaysClick(value))
  }
}

export default connect(null, mapDispatchToProps)(MarketDaysInput);