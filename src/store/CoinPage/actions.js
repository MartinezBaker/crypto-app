import axios from 'axios';
import { MARKET_DAYS_CLICK } from 'store/Coins/reducer';
import { getCurrency } from 'store/Main/reducer';
import { GET_COIN_INFO_PENDING, GET_COIN_INFO_SUCCESS, GET_COIN_INFO_FAILED, GET_CHART_DATA_PENDING, GET_CHART_DATA_SUCCESS, GET_CHART_DATA_FAILED, CONVERTER_SUBMIT, getMarketDays } from './reducer'

export const getCoinInfo = (coin) => async (dispatch, getState) => {
    try{
        dispatch({
            type: GET_COIN_INFO_PENDING,
        })
        const { data } = await axios(
          `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false`
        );
        dispatch({
            type: GET_COIN_INFO_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: GET_COIN_INFO_FAILED,
            payload: "Could Not Load Coin Data!!"
        })

    }
}

export const getChartData = (coin) => async (dispatch, getState) => {
    try {
        dispatch({
        type: GET_CHART_DATA_PENDING,
        });
        const currency = getCurrency(getState())
        const marketDays = getMarketDays(getState())
        const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${marketDays}&interval=daily`
        );
        dispatch({
        type: GET_CHART_DATA_SUCCESS,
        payload: data
        });
    }catch(error) {
        dispatch({
        type: GET_CHART_DATA_FAILED,
        payload: "Could Not Load Chart Data!!"
        });
    }
};

export const converterSubmit = (value, symbol) => {
    return{
        type: CONVERTER_SUBMIT,
        payload: {
            value : value,
            symbol : symbol
        }
    }
}

export const marketDaysClick = (value) => {
    console.log(value)
    return{
        type: MARKET_DAYS_CLICK,
        payload: value
    }
}