import { CHANGE_CURRENCY, SET_DARK_MODE } from "./reducer"

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