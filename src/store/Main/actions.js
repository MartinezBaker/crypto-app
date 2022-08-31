import { CHANGE_CURRENCY, SELECT_DROPDOWN, SET_DARK_MODE, GET_SEARCH_PENDING, GET_SEARCH_SUCCESS, GET_SEARCH_FAILED, SAVE_COIN_ID, CHANGE_PATH, GET_GLOBAL_INFO_FAILED, GET_GLOBAL_INFO_PENDING, GET_GLOBAL_INFO_SUCCESS, OPEN_NAV } from "./reducer"
import axios from 'axios'

export const getGlobalInfo = () => async (dispatch, getState) => {
  try{
    dispatch({
      type: GET_GLOBAL_INFO_PENDING
    })
    const { data } = await axios(`https://api.coingecko.com/api/v3/global`)
    dispatch({
      type: GET_GLOBAL_INFO_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_GLOBAL_INFO_FAILED,
      payload: "Could Not Get Global Info!!"
    })
  }
}

export const navSearchBar = (value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SEARCH_PENDING,
    });
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/search?query=${value}`
    );
    const coins = data.coins;
    dispatch({
      type: GET_SEARCH_SUCCESS,
      payload: coins,
    });
  } catch (error) {
    dispatch({
      type: GET_SEARCH_FAILED,
      payload: "Could Not Load Inquery!!",
    });
  }
};

export const changeCurrency = (value) => {
    return{
        type: CHANGE_CURRENCY,
        payload: value
    }
}

export const darkModeClick = () => {
    return {
        type: SET_DARK_MODE,
    }
}

export const selectDropDown = (value) => {
    return {
        type: SELECT_DROPDOWN,
        payload: value
    }
}

export const saveCoinId = (id) => {
    return {
        type: SAVE_COIN_ID,
        payload: id
    }
}

export const changePath = (path) => {
  return {
    type: CHANGE_PATH,
    payload: path
  }
}

export const openNav = () => {
  return {
    type: OPEN_NAV
  }
}