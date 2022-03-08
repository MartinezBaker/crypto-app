import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Progressbar from '../Progress/index';
import LineChart from '../TableCharts/index'

const formatTimePercent = (t) => {
  if(t === null){
    return "-"
  }
  if(t.includes("-")) {
    return t.slice(1, 5) + "%";
  }else {
    return t.slice(0, 4) + "%";
  }
}

const changeNumColor = (n) => {
  if(n === null){
    return 
  }else if (n.includes("-")){
    return "percent-red"
  }else{
    return "percent-green"
  }
}

const formatNum = (n) => {
  if (n < 1e3) return n;
  if(n === null) return <span>&infin;</span> 
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M"; 
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B"; 
  if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(1) + "T";
  if (n >= 1e15) return +(n / 1e15).toFixed(1) + "QD";
};


export const CoinInstance = (props) => (
  <tr className='data-row'>
    <td>
      <img className="coin-image" src={props.image} alt="Coin" />{" "}
      <span className='coin-name'>{props.name.length < 9 ? props.name : props.name.slice(0, 9) + "..."}{" "}
      ({props.symbol})</span>
    </td>
    <td>
      $
      {props.price.includes("e")
        ? props.price.slice(0, props.price.indexOf("e"))
        : props.price}
    </td>
    <td className={changeNumColor(props.oneHour)}>
      {props.oneHour && (
        <FontAwesomeIcon
          className="caret-icon"
          icon={props.oneHour.charAt(0) === "-" ? faCaretDown : faCaretUp}
        />
      )}{" "}
      {formatTimePercent(props.oneHour)}
    </td>
    <td className={changeNumColor(props.twentyFourHour)}>
      {props.twentyFourHour && (
        <FontAwesomeIcon
          className="caret-icon"
          icon={
            props.twentyFourHour.charAt(0) === "-" ? faCaretDown : faCaretUp
          }
        />
      )}{" "}
      {formatTimePercent(props.twentyFourHour)}
    </td>
    <td className={changeNumColor(props.sevenDay)}>
      {props.sevenDay && (
        <FontAwesomeIcon
          className="caret-icon"
          icon={props.sevenDay.charAt(0) === "-" ? faCaretDown : faCaretUp}
        />
      )}{" "}
      {formatTimePercent(props.sevenDay)}
    </td>
    <td>
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
        <Progressbar progress={props.totalVolPercentage} height={10} />
      </div>
    </td>
    <td>
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
        <Progressbar
          progress={props.circulatingSupplyPercentage}
          height={10}
        />
      </div>
    </td>
    <td className='chart-padding'>
      <LineChart chartData={props.sparkLine.price} sevenDay={props.sevenDay}/>
    </td>
  </tr>
);


