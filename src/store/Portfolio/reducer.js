

const initialState = {showModal: false, loading: false, error: false, errorMessage: null, savedCoins: {}, portfolio:[], historyData: {}, idArry: [], currentInfoArry: [], searchArry: []};

export const SHOW_MODAL = "SHOW_MODAL"
export const SAVE_COIN_OBJECT = "SAVE_COIN_OBJECT";
export const GET_HISTORY_PENDING = "GET_HISTORY_PENDING";
export const GET_HISTORY_SUCCESS = "GET_HISTORY_SUCCESS"
export const GET_HISTORY_FAILED = "GET_HISTORY_FAILED"
export const CREATE_PORTFOLIO_OBJ = "CREATE_PORTFOLIO_OBJ"
export const GET_CURRENT_INFO_PENDING = "GET_CURRENT_INFO_PENDING";
export const GET_CURRENT_INFO_SUCCESS = "GET_CURRENT_INFO_SUCCESS";
export const GET_CURRENT_INFO_FAILED = "GET_CURRENT_INFO_FAILED";
export const DELETE_COIN = "DELETE_COIN"
export const GET_SEARCH_VALUE_PENDING = "GET_SEARCH_VALUE_PENDING"
export const GET_SEARCH_VALUE_SUCCESS = "GET_SEARCH_VALUE_SUCCESS"
export const GET_SEARCH_VALUE_FAILED = "GET_SEARCH_VALUE_FAILED"

export default function portfolioReducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return{
        ...state, showModal: !state.showModal 
      }
    case GET_SEARCH_VALUE_PENDING:
      return {
        ...state, loading: true
      }
    case GET_SEARCH_VALUE_SUCCESS:
      return {
        ...state, loading: false, searchArry: action.payload
      }
    case GET_SEARCH_VALUE_FAILED:
      return {
        ...state, loading: false, error: true, errorMessage: action.payload
      }
    case SAVE_COIN_OBJECT:
      const filterAllCoins = state.searchArry.filter((coin) => coin.name.toLowerCase() === action.payload.nameValue.toLowerCase() )
      const date = new Date(action.payload.date) 
      const newMonth = (`${date.getMonth() + 1}`).toString().padStart(2, "0")
      const newDay = (`${date.getDate()}`).toString().padStart(2, "0")
      const newDate = `${newDay}-${newMonth}-${date.getFullYear()}`;
      const coinObj = {
        coinName: action.payload.nameValue, 
        amount: action.payload.amount,
        date: newDate,
        savedDate: action.payload.date
      }
      return {
        ...state,
        savedCoins: coinObj,
        idArry: [...state.idArry, filterAllCoins[0]?.id],
      };
    case GET_HISTORY_PENDING:
      return{
        ...state, loading: true, error: false, errorMessage: ""
      }
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        historyData: action.payload, error: false, errorMessage: ""
      };
    case GET_HISTORY_FAILED:
      return{
        ...state, loading: false, error: true, errorMessage: action.payload
      }
    case GET_CURRENT_INFO_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case GET_CURRENT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        currentInfoArry: action.payload,
        error: false,
        errorMessage: "",
      };
    case GET_CURRENT_INFO_FAILED:
      return{
        ...state, loading: false, error: true, errorMessage: action.payload
      }
    case CREATE_PORTFOLIO_OBJ:
      const findInPortfolio = state.portfolio.find((coin) => coin.id === action.payload.id ? true : false)
      const filterCoin = state.portfolio.filter((coin) => coin.id !== action.payload.id)
      const filterId = state.idArry.filter((id) => id !== action.payload.id)
      const portfolioObj = {
        id: action.payload.id,
        name: state.historyData?.name,
        symbol: state.historyData?.symbol,
        image: state.historyData?.image?.small,
        amount: state.savedCoins?.amount,
        date: state.savedCoins?.savedDate,
        priceAtPurchase: state.historyData?.market_data?.current_price
      };
      if(!action.payload.id){
        return state
      }
      else if(!findInPortfolio){
        return {
          ...state,
          portfolio: [...state.portfolio, portfolioObj]
        };
      }else{
        return {
          ...state, portfolio: [...filterCoin, portfolioObj], idArry: [...filterId, action.payload.id]
        }
      }
      case DELETE_COIN:
       const newPortfolio = state.portfolio.filter((coin) => coin.id !== action.payload)
       const newIdArry =  state.idArry.filter((id) => id !== action.payload)
       return{
        ...state, portfolio: newPortfolio, idArry: newIdArry, savedCoins: {}
       }
    default:
      return state
    
  }
}

export const getSavedCoinDate = (state) => state.portfolio.savedCoins.date
