

const initialState = {showModal: false, loading: false, error: false, errorMessage: null, savedCoins: {}, portfolio:[], historyData:[], coins:[]};

export const SHOW_MODAL = "SHOW_MODAL"
export const SAVE_COIN_OBJECT = "SAVE_COIN_OBJECT";
export const GET_HISTORY_PENDING = "GET_HISTORY_PENDING";
export const GET_HISTORY_SUCCESS = "GET_HISTORY_SUCCESS"
export const GET_HISTORY_FAILED = "GET_HISTORY_FAILED"
export const CREATE_PORTFOLIO_OBJ = "CREATE_PORTFOLIO_OBJ"
export const GET_COINS_PENDING = "GET_COINS_PENDING"
export const GET_COINS_SUCCESS = "GET_COINS_SUCCESS"
export const GET_COINS_FAILED = "GET_COINS_FAILED";
export const DELETE_COIN = "DELETE_COIN"

export default function portfolioReducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return{
        ...state, showModal: !state.showModal 
      }
    case SAVE_COIN_OBJECT:
      const date = new Date(action.payload.date) 
      const newMonth = (`${date.getMonth() + 1}`).toString().padStart(2, "0")
      const newDay = (`${date.getDate() + 1}`).toString().padStart(2, "0")
      const newDate = `${newDay}-${newMonth}-${date.getFullYear()}`;
      const coinObj = {
        coinName: action.payload.nameValue, 
        amount: action.payload.amount,
        date: newDate,
        savedDate: action.payload.date
      }
      return{
        ...state, savedCoins: coinObj
      }
    case GET_HISTORY_PENDING:
      return{
        ...state, loading: true
      }
    case GET_HISTORY_SUCCESS:
      const findHistory = state.historyData.find((history) => history.id === action.payload.id ? true : false)
      const filterHistory = state.historyData.filter((history) =>  history.id !== action.payload.id)
      if(!findHistory){
        return {
          ...state,
          loading: false,
          historyData: [...state.historyData, action.payload]
        };
      }else{
        return{
          ...state, loading: false, historyData: [...filterHistory, action.payload]
        }
      }
    case GET_HISTORY_FAILED:
      return{
        ...state, loading: false, error: true, errorMessage: action.payload
      }
    case GET_COINS_PENDING:
      return{
        ...state, loading: true
      }
    case GET_COINS_SUCCESS:
      return{
        ...state, loading: false, coins: action.payload
      }
    case GET_COINS_FAILED:
      return{
        ...state, loading: false, error: true, errorMessage: action.payload
      }
    case CREATE_PORTFOLIO_OBJ:
      const coinArryFilter = state.coins.filter((coin) => coin.id === action.payload)
      const findInPortfolio = state.portfolio.find((coin) => coin.name?.toLowerCase() === state.savedCoins.coinName?.toLowerCase() ? true : false)
      const filterCoin = state.portfolio.filter((coin) => coin.name?.toLowerCase() !== state.savedCoins.coinName?.toLowerCase())
      const portfolioObj = {
        id: action.payload,
        name: coinArryFilter[0]?.name,
        amount: state.savedCoins.amount,
        date: state.savedCoins.savedDate,
      };
      if(!findInPortfolio){
        return {
          ...state,
          portfolio: [...state.portfolio, portfolioObj],
        };
      }else{
        return {
          ...state,
          portfolio: [...filterCoin, portfolioObj]
        }
      }
      case DELETE_COIN:
       const newPortfolio = state.portfolio.filter((coin) => coin.name !== action.payload)
       return{
        ...state, portfolio: [...newPortfolio], savedCoins: {}
       }
    default:
      return state
    
  }
}

export const getSavedCoinDate = (state) => state.portfolio.savedCoins.date
