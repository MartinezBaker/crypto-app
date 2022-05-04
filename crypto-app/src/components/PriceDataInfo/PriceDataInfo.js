import React from 'react'
import { setCaretIcon } from "utils/FontAwesomeutil";
import { Percent, DataInfo } from './styles'
import { formatPercent, formatDate } from 'utils/functionUtils';

const PriceDataInfo = ({name, price, percent, date}) => (
  <DataInfo>
    <div><strong>{name}:</strong></div>
    <div>${price?.toLocaleString()}</div>
    <Percent data={percent?.toString()}>{percent && setCaretIcon(percent?.toString())} {formatPercent(percent?.toString())}</Percent>
    <div>{formatDate(date)}</div>
  </DataInfo>
);

export default PriceDataInfo;