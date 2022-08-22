import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {  ProgressBar } from "components";
import { TableCharts } from 'components/Charts/index';
import { formatTimePercent, formatNum, formatCoinName, formatPrice } from 'utils/functionUtils';
import { setCaretIcon } from 'utils/FontAwesomeutil'
import { CoinImage, PercentColor, DataRow, TableCell, TableSparkLineCell, TableProgressCell, ProgressParent } from './styles';

const CoinInstance = (props) => (
  <DataRow>
    <TableCell>
      <CoinImage src={props.image} alt="Coin" />{" "}
      <Link
        to={`/coins/${props.id}`}
        style={{
          textDecoration: "none",
          color: props.main.darkMode ? "white" : "black",
        }}
      >
        {formatCoinName(props.name)} ({props.symbol})
      </Link>
    </TableCell>
    <TableCell>
      {props.main.symbol}
      {formatPrice(props.price)}
    </TableCell>
    <PercentColor data={props.oneHour?.toString()}>
      {props.oneHour && setCaretIcon(props.oneHour?.toString())}{" "}
      {formatTimePercent(props.oneHour?.toString())}
    </PercentColor>
    <PercentColor data={props.twentyFourHour?.toString()}>
      {props.twentyFourHour && setCaretIcon(props.twentyFourHour.toString())}{" "}
      {formatTimePercent(props.twentyFourHour?.toString())}
    </PercentColor>
    <PercentColor data={props.sevenDay?.toString()}>
      {props.sevenDay && setCaretIcon(props.sevenDay?.toString())}{" "}
      {formatTimePercent(props.sevenDay?.toString())}
    </PercentColor>
    <TableProgressCell>
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
      <ProgressBar
        progress={props.totalVolPercentage}
        width={"123px"}
        height={"10px"}
      />
    </TableProgressCell>
    <TableProgressCell>
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
        width={"123px"}
        height={"10px"}
      />
    </TableProgressCell>
    <TableSparkLineCell>
      <TableCharts
        chartData={props.sparkLine.price}
        sevenDay={props.sevenDay}
      />
    </TableSparkLineCell>
  </DataRow>
);
const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, null)(CoinInstance);