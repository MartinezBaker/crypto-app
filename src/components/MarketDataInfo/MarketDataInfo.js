import React from 'react';
import { MarketFlexDiv, BulletDiv, MarketInfoDiv } from './styles';

const MarketDataInfo = (props) => {
  return (
    <MarketFlexDiv>
      <BulletDiv>+</BulletDiv>
      <MarketInfoDiv>
        <strong>{props.title}:</strong> {props.valueSymbol}
        {props.value}
      </MarketInfoDiv>
    </MarketFlexDiv>
  );
};

export default MarketDataInfo;