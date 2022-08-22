import axios from "axios";
import {
  SHOW_MODAL,
  SAVE_COIN_OBJECT,
  GET_HISTORY_FAILED,
  GET_HISTORY_PENDING,
  GET_HISTORY_SUCCESS,
  CREATE_PORTFOLIO_OBJ,
  GET_CURRENT_INFO_PENDING,
  GET_CURRENT_INFO_SUCCESS,
  GET_CURRENT_INFO_FAILED,
  DELETE_COIN,
  GET_SEARCH_VALUE_PENDING,
  GET_SEARCH_VALUE_SUCCESS,
  GET_SEARCH_VALUE_FAILED,
  getSavedCoinDate,
} from "./reducer";

export const searchCoin = (value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SEARCH_VALUE_PENDING,
    });
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/search?query=${value}`
    );
    const coins = data.coins
    dispatch({
      type: GET_SEARCH_VALUE_SUCCESS,
      payload: coins,
    });
  } catch (error) {
    dispatch({
      type: GET_SEARCH_VALUE_FAILED,
      payload: "Could Not Load Inquery!!",
    });
  }
};

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

export const getCurrentInfo = (arry) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CURRENT_INFO_PENDING,
    });
    const currentInfo = await Promise.all(arry.map(async (id) => {
      const { data } = await axios(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false`
      );
      return data
    }))
    dispatch({
      type: GET_CURRENT_INFO_SUCCESS,
      payload: currentInfo,
    });
  } catch (error) {
    dispatch({
      type: GET_CURRENT_INFO_FAILED,
      payload: "Could Not Load Coin Data!!",
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

export const createPortfolioObj = (id, currency) => {
  return {
    type: CREATE_PORTFOLIO_OBJ,
    payload: {
      id: id, 
      currency: currency
    }
  };
};

export const deleteCoin = (coin) => {
  return{
    type: DELETE_COIN, 
    payload: coin
  }
}
