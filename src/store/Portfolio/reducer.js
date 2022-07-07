const initialState = {showModal: false, loading: false, error: false, errorMessage: null, coinList: null};

export const SHOW_MODAL = "SHOW_MODAL"
export const SAVE_COIN_OBJECT = "SAVE_COIN_OBJECT";
export const GET_COINS_SUCCESS = "GET_COINS_SUCCESS" 
export const GET_COINS_PENDING = "GET_COINS_PENDING"
export const GET_COINS_FAILED = "GET_COINS_FAILED";

export default function portfolioReducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return{
        ...state, showModal: !state.showModal 
      }
    case GET_COINS_PENDING:
      return{
        ...state, 
        loading: true
      }
    case GET_COINS_SUCCESS:
      return{
        ...state, 
        loading: false, 
        coinList: action.payload
      }
    case GET_COINS_FAILED:
      return{
        ...state, 
        loading: false, 
        error: true, 
        errorMessage: action.payload
      }
    default:
      return state
    
  }
}
