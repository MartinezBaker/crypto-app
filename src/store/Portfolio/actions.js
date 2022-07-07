import axios from 'axios';
import {
  SHOW_MODAL,
  SAVE_COIN_OBJECT,
  GET_COINS_FAILED,
  GET_COINS_PENDING,
  GET_COINS_SUCCESS,
} from "./reducer";
import { getCurrency } from 'store/Main/reducer';

export const getCoins = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: GET_COINS_PENDING   
        })
        const currency = getCurrency(getState())
        const { data } = await axios(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
        );
        dispatch({
            type: GET_COINS_SUCCESS, 
            payload: data
        })
    }catch(error){
        dispatch({
            type: GET_COINS_FAILED,
            payload: "There Was A Problem Getting List!"
        })
    }
}

export const showModal = () => {
    return {
        type: SHOW_MODAL,
    }
}

export const saveCoinObj = (nameValue, amount, date) => {
    return {
        type: SAVE_COIN_OBJECT,
        payload: {
            nameValue: nameValue, 
            amount: amount, 
            date: date
        } 
    }
}