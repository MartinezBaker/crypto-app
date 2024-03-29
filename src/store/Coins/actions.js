import axios from "axios";
import {
  GET_COINS_FAILED,
  GET_COINS_PENDING,
  GET_COINS_SUCCESS,
  GET_MORE_COINS_FAILED,
  GET_MORE_COINS_PENDING,
  GET_MORE_COINS_SUCCESS,
  GET_CHART_DATA_FAILED,
  GET_CHART_DATA_PENDING,
  GET_CHART_DATA_SUCCESS,
  SORT_AT_TOP,
  SORT_ITEMS,
  MARKET_DAYS_CLICK,
  getMarketDays
} from "./reducer";
import { getCurrency } from "store/Main/reducer";

export const getCoins = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COINS_PENDING,
    });
    const currency = getCurrency(getState());
    const { data } = await axios(
      `${process.env.REACT_APP_ENDPOINT}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    dispatch({
      type: GET_COINS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COINS_FAILED,
      payload: "Could Not Load Coins!!",
    });
  }
};

export const getMoreCoins = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MORE_COINS_PENDING,
    });
    const currency = getCurrency(getState());
    const { data } = await axios(
      `${process.env.REACT_APP_ENDPOINT}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    dispatch({
      type: GET_MORE_COINS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MORE_COINS_FAILED,
      payload: "Could Not Load More Coins!!",
    });
  }
};

export const getChartData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CHART_DATA_PENDING,
    });
    const currency = getCurrency(getState());
    const marketDays = getMarketDays(getState())
    const { data } = await axios(
      `${process.env.REACT_APP_ENDPOINT}/coins/bitcoin/market_chart?vs_currency=${currency}&days=${marketDays}&interval=daily`
    );
    dispatch({
      type: GET_CHART_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHART_DATA_FAILED,
      payload: "Could Not Load Chart Data!!",
    });
  }
};

export const marketDaysClick = (days) => {
  return {
    type: MARKET_DAYS_CLICK,
    payload: days,
  };
};

export const sortItems = (sortType) => {
  return {
    type: SORT_ITEMS,
    payload: sortType,
  };
};

export const sortAtTop = () => {
  return {
    type: SORT_AT_TOP,
  };
};