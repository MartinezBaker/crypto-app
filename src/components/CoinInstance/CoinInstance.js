import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {  ProgressBar } from "components";
import { TableCharts } from 'components/Charts/index';
import { formatTimePercent, formatNum, formatCoinName, formatPrice } from 'utils/functionUtils';
import { setCaretIcon } from 'utils/FontAwesomeutil'
import { CoinImage, PercentColor, DataRow, TableCell, ProgressParent } from './styles';

const CoinInstance = (props) => (
  <DataRow>
    <TableCell>
      <CoinImage src={props.image} alt="Coin" />{" "}
      <Link
        to={`/coins/${props.id}`}
        style={{ textDecoration: "none", color: props.main.darkMode ? "white" : "black" }}
      >
        {formatCoinName(props.name)} ({props.symbol})
      </Link>
    </TableCell>
    <TableCell>
      {props.currSymbol}
      {formatPrice(props.price)}
    </TableCell>
    <PercentColor data={props.oneHour}>
      {props.oneHour && setCaretIcon(props.oneHour)}{" "}
      {formatTimePercent(props.oneHour)}
    </PercentColor>
    <PercentColor data={props.twentyFourHour}>
      {props.twentyFourHour && setCaretIcon(props.twentyFourHour)}{" "}
      {formatTimePercent(props.twentyFourHour)}
    </PercentColor>
    <PercentColor data={props.sevenDay}>
      {props.sevenDay && setCaretIcon(props.sevenDay)}{" "}
      {formatTimePercent(props.sevenDay)}
    </PercentColor>
    <TableCell>
      <ProgressParent>
        <div>
          &#x2022;{" "}
          {props.totalVolume ? (
            props.main.symbol + formatNum(props.totalVolume)
          ) : (
            <span>&infin;</span>
          )}
        </div>
        <div>
          &#x2022;{" "}
          {props.marketCap ? (
            props.main.symbol + formatNum(props.marketCap)
          ) : (
            <span>&infin;</span>
          )}
        </div>
      </ProgressParent>
      <ProgressBar progress={props.totalVolPercentage} width={"120px"} />
    </TableCell>
    <TableCell>
      <ProgressParent>
        <div>
          &#x2022;{" "}
          {props.circulatingSupply ? (
            formatNum(props.circulatingSupply)
          ) : (
            <span>&infin;</span>
          )}{" "}
        </div>
        <div>
          &#x2022;{" "}
          {props.totalSupply ? (
            formatNum(props.totalSupply)
          ) : (
            <span>&infin;</span>
          )}
        </div>
      </ProgressParent>
      <ProgressBar
        progress={props.circulatingSupplyPercentage}
        width={"120px"}
      />
    </TableCell>
    <TableCell>
      <TableCharts
        chartData={props.sparkLine.price}
        sevenDay={props.sevenDay}
      />
    </TableCell>
  </DataRow>
);

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, null)(CoinInstance);