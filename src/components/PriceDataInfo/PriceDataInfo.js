import React from 'react'
import { setCaretIcon } from "utils/FontAwesomeutil";
import { Percent, DataInfo, NameDiv, PriceDiv } from './styles'
import { formatPercent, formatDate } from 'utils/functionUtils';

const PriceDataInfo = ({name, price, percent, date, symbol}) => (
  <DataInfo >
    <NameDiv><strong>{name}:</strong></NameDiv>
    <PriceDiv>{symbol}{price?.toLocaleString()}</PriceDiv>
    <Percent data={percent?.toString()}>{percent && setCaretIcon(percent?.toString())} {formatPercent(percent?.toString())}</Percent>
    <div>{formatDate(date)}</div>
  </DataInfo>
);

export default PriceDataInfo;