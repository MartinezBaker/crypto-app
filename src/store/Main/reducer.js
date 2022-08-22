const initialState = {
  currentCurrency: "usd",
  symbol: "$",
  darkMode: true,
  searchArry: [],
  savedCoinId: "",
  path: "/coins",
  globalInfo: {}
};
export const CHANGE_CURRENCY = "CHANGE_CURRENCY";
export const SET_DARK_MODE = "SET_DARK_MODE";
export const SELECT_DROPDOWN = "SELECT_DROPDOWN";
export const GET_SEARCH_PENDING = "GET_SEARCH_PENDING";
export const GET_SEARCH_SUCCESS = "GET_SEARCH_SUCCESS";
export const GET_SEARCH_FAILED = "GET_SEARCH_FAILED";
export const SAVE_COIN_ID = "SAVE_COIN_ID";
export const CHANGE_PATH = "CHANGE_PATH"
export const GET_GLOBAL_INFO_PENDING = "GET_GLOBAL_INFO_PENDING"
export const GET_GLOBAL_INFO_SUCCESS = "GET_GLOBAL_INFO_SUCCESS"
export const GET_GLOBAL_INFO_FAILED = "GET_GLOBAL_INFO_FAILED"

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENCY:
      const currObj = {
        usd: "$",
        gbp: "£",
        eur: "€",
        btc: "₿",
        eth: "Ξ",
      };
      return {
        ...state,
        currentCurrency: Object.entries(currObj)
          .map((entry) => {
            const [key] = entry;
            return key === action.payload ? action.payload : null;
          })
          .filter((curr) => curr !== null)
          .reduce((c) => c),
        symbol: Object.entries(currObj)
          .map((entry) => {
            const [key] = entry;
            return key === action.payload ? currObj[action.payload] : null;
          })
          .filter((sym) => sym !== null)
          .reduce((c) => c),
      };
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case SELECT_DROPDOWN:
      const currencySelected = Object.entries(state.dropDownSelect)
        .map((entry) => {
          const [key] = entry;
          if (action.payload === key) {
            return {
              [key]: "selected",
            };
          } else {
            return {
              [key]: null,
            };
          }
        })
        .reduce((acc, element) => ({ ...acc, ...element }), {});
      return {
        ...state,
        dropDownSelect: currencySelected,
      };
    case GET_SEARCH_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchArry: action.payload,
      };
    case GET_SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    case SAVE_COIN_ID:
      return {
        ...state,
        savedCoinId: action.payload,
      };
    case CHANGE_PATH:
      return{
        ...state, path: action.payload
      }
    case GET_GLOBAL_INFO_PENDING:
      return{
        ...state, loading: true, error: false, errorMessage: ""
      }
    case GET_GLOBAL_INFO_SUCCESS:
      return{
        ...state, loading: false, globalInfo: action.payload
      }
    case GET_GLOBAL_INFO_FAILED:
      return{
        ...state, loading: false, error: true, errorMessage: action.payload
      }
    default:
      return state;
  }
}

export const getCurrency = (state) => state.main.currentCurrency;
