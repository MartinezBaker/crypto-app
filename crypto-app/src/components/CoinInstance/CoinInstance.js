import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { TableCharts, ProgressBar } from "components";
import {formatTimePercent, formatNum} from '../../utils/index';
import { CoinImage, PercentColor, DataRow, TableCell } from './styles';

const CoinInstance = (props) => (
  <DataRow>
    <TableCell>
      <CoinImage src={props.image} alt="Coin" />{" "}
      {props.name.length < 9 ? props.name : props.name.slice(0, 9) + "..."} (
      {props.symbol})
    </TableCell>
    <TableCell>
      $
      {props.price.includes("e")
        ? props.price.slice(0, props.price.indexOf("e"))
        : props.price}
    </TableCell>
    <PercentColor data={props.oneHour}>
      {props.oneHour && (
        <FontAwesomeIcon
          style={{ fontSize: "12px" }}
          icon={props.oneHour.charAt(0) === "-" ? faCaretDown : faCaretUp}
        />
      )}{" "}
      {formatTimePercent(props.oneHour)}
    </PercentColor>
    <PercentColor data={props.twentyFourHour}>
      {props.twentyFourHour && (
        <FontAwesomeIcon
          style={{ fontSize: "12px" }}
          icon={
            props.twentyFourHour.charAt(0) === "-" ? faCaretDown : faCaretUp
          }
        />
      )}{" "}
      {formatTimePercent(props.twentyFourHour)}
    </PercentColor>
    <PercentColor data={props.sevenDay}>
      {props.sevenDay && (
        <FontAwesomeIcon
          style={{ fontSize: "12px" }}
          icon={props.sevenDay.charAt(0) === "-" ? faCaretDown : faCaretUp}
        />
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
