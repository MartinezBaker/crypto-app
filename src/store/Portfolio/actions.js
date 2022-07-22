import axios from "axios";
import {
  SHOW_MODAL,
  SAVE_COIN_OBJECT,
  GET_HISTORY_FAILED,
  GET_HISTORY_PENDING,
  GET_HISTORY_SUCCESS,
  CREATE_PORTFOLIO_OBJ,
  GET_COINS_PENDING,
  GET_COINS_FAILED,
  GET_COINS_SUCCESS,
  DELETE_COIN,
  getSavedCoinDate,
} from "./reducer";
import { getCurrency } from "store/Main/reducer";

export const getHistory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_HISTORY_PENDING,
    });
    const date = getSavedCoinDate(getState());
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}`
    );
    dispatch({
      type: GET_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_HISTORY_FAILED,
      payload: "Could Not Load History!!",
    });
  }
};

export const getCoins = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COINS_PENDING,
    });
    const currency = getCurrency(getState());
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
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

export const showModal = () => {
  return {
    type: SHOW_MODAL,
  };
};

export const saveCoinObj = (nameValue, amount, date) => {
  return {
    type: SAVE_COIN_OBJECT,
    payload: {
      nameValue: nameValue,
      amount: amount,
      date: date,
    },
  };
};

export const createPortfolioObj = (id) => {
  return {
    type: CREATE_PORTFOLIO_OBJ,
    payload: id
  };
};

export const deleteCoin = (coin) => {
  return{
    type: DELETE_COIN, 
    payload: coin
  }
}
