const initialState = { 
  currentCurrency: "usd", 
  symbol: "$", 
  darkMode: true 
};
export const CHANGE_CURRENCY = "CHANGE_CURRENCY";
export const SET_DARK_MODE = "SET_DARK_MODE";

export default function mainReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_CURRENCY:
      const currObj = {
        "usd": "$",
        "gbp": "£",
        "eur": "€",
        "btc": "₿",
        "eth": "Ξ",
      };
      return{
        ...state, 
        currentCurrency: Object.entries(currObj).map((entry) => {
          const [key] = entry
          return key === action.payload ? action.payload : null}).filter((curr) => curr !== null).reduce((c) => c),
          symbol: Object.entries(currObj).map((entry) => {
          const [key] = entry
          return key === action.payload ? currObj[action.payload] : null}).filter((sym) => sym !== null).reduce((c) => c)
      }
    case SET_DARK_MODE:
      return{
        ...state, darkMode: !state.darkMode
      }  
    default:
      return state    
  }
}

export const getCurrency = (state) => state.main.currentCurrency;
