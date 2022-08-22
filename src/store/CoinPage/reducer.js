const initialState = {coinInfo: {}, loading: false, error: false, errorMessage: "", marketDays: 29, chartData: {}, currencyInput: "", coinInput: ""}
export const GET_COIN_INFO_PENDING = "GET_COIN_INFO_PENDING";
export const GET_COIN_INFO_SUCCESS = "GET_COIN_INFO_SUCCESS";
export const GET_COIN_INFO_FAILED = "GET_COIN_INFO_FAILED";
export const GET_CHART_DATA_PENDING = "GET_COIN_INFO_PENDING";
export const GET_CHART_DATA_SUCCESS = "GET_CHART_DATA_SUCCESS";
export const GET_CHART_DATA_FAILED = "GET_CHART_DATA_FAILED";
export const CONVERTER_SUBMIT = "CONVERTER_SUBMIT";
export const MARKET_DAYS_CLICK = "MARKET_DAYS_CLICK";

export default function coinPageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COIN_INFO_PENDING:
            return {
              ...state,
              loading: true,
              error: false,
              errorMessage: ""
            };
        case GET_COIN_INFO_SUCCESS:
            return {
              ...state,
              coinInfo: action.payload,
              loading: false,
              error: false,
              errorMessage: ""
            };
        case GET_COIN_INFO_FAILED:
            return {
            ...state,
            loading: false,
            error: true,
            errorMessage: action.payload,
            };
        case GET_CHART_DATA_PENDING:
            return {
              ...state,
              loading: true,
              error: false,
              errorMessage: ""
            };
        case GET_CHART_DATA_SUCCESS:
            return {
              ...state,
              chartData: action.payload,
              loading: false,
              error: false,
              errorMessage: ""
            };
        case GET_CHART_DATA_FAILED:
            return {
            ...state,
            loading: false,
            error: true,
            errorMessage: action.payload,
            };
        case CONVERTER_SUBMIT:
            const {value, symbol} = action.payload;
            const newCurrencyInput =  value.charAt(0) === symbol ? value : ""
            const newCoinInput = value.charAt(0) !== symbol ? value : ""
            return {
            ...state,
            currencyInput: newCurrencyInput,
            coinInput: newCoinInput
            };
        case MARKET_DAYS_CLICK: 
            const marketDaysObj = {
                "1d": 1,
                "7d": 6,
                "30d": 29,
                "90d": 89,
                "1y": 364,
                Max: "max"
            }
            const marketDayArry = Object.entries(marketDaysObj).map((entry) => {
                const [key] = entry;
                return key === action.payload ? marketDaysObj[action.payload] : null
                }).filter((el) => el !== null)
            const newMarketDay = marketDayArry.length ? marketDayArry.reduce((c) => c) : state.marketDays
            return {
                ...state,
                marketDays: newMarketDay
            }
        default:
            return state
    }
}

export const getMarketDays = (state) => state.coinPage.marketDays
