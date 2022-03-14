import React from 'react';
import { TableCharts, ProgressBar } from "components";
import { formatTimePercent, formatNum, formatCoinName, formatPrice } from '../../utils/utils';
import { setCaretIcon } from '../../utils/FontAwsomeutil'
import { CoinImage, PercentColor, DataRow, TableCell } from './styles';

const CoinInstance = (props) => (
  <DataRow>
    <TableCell>
      <CoinImage src={props.image} alt="Coin" />{" "}
      {formatCoinName(props.name)} (
      {props.symbol})
    </TableCell>
    <TableCell>
      ${formatPrice(props.price)}
    </TableCell>
    <PercentColor data={props.oneHour}>
      {props.oneHour && (
        setCaretIcon(props.oneHour)
      )}{" "}
      {formatTimePercent(props.oneHour)}
    </PercentColor>
    <PercentColor data={props.twentyFourHour}>
      {props.twentyFourHour && (
        setCaretIcon(props.twentyFourHour)
        
      )}{" "}
      {formatTimePercent(props.twentyFourHour)}
    </PercentColor>
    <PercentColor data={props.sevenDay}>
      {props.sevenDay && (
        setCaretIcon(props.sevenDay)
      )}{" "}
      {formatTimePercent(props.sevenDay)}
    </PercentColor>
    <TableCell>
      <div>
        &#x2022;{" "}
        {props.totalVolume ? (
          "$" + formatNum(props.totalVolume)
        ) : (
          <span>&infin;</span>
        )}{" "}
        &#x2022;{" "}
        {props.marketCap ? (
          "$" + formatNum(props.marketCap)
        ) : (
          <span>&infin;</span>
        )}
      </div>
      <div>
        <ProgressBar progress={props.totalVolPercentage} />
      </div>
    </TableCell>
    <TableCell>
      <div>
        &#x2022;{" "}
        {props.circulatingSupply ? (
          "$" + formatNum(props.circulatingSupply)
        ) : (
          <span>&infin;</span>
        )}{" "}
        &#x2022;{" "}
        {props.totalSupply ? (
          "$" + formatNum(props.totalSupply)
        ) : (
          <span>&infin;</span>
        )}
      </div>
      <div>
        <ProgressBar progress={props.circulatingSupplyPercentage} />
      </div>
    </TableCell>
    <TableCell>
      <TableCharts
        chartData={props.sparkLine.price}
        sevenDay={props.sevenDay}
      />
    </TableCell>
  </DataRow>
);

export default CoinInstance;
