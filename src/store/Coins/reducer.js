const initialState = {
  coins: null,
  page: 1,
  loading: false,
  error: false,
  hasMore: true,
  errorMessage: "",
  chartData: null,
  marketDays: 29,
  sortBy: "BY MARKET CAP",
  sort: {
    sortName: null,
    current_price: null,
    price_change_percentage_1h_in_currency: null,
    price_change_percentage_24h_in_currency: null,
    price_change_percentage_7d_in_currency: null,
  },
};
export const GET_COINS_PENDING = "GET_COINS_PENDING";
export const GET_COINS_SUCCESS = "GET_COINS_SUCCESS";
export const GET_COINS_FAILED = "GET_COINS_FAILED";
export const GET_MORE_COINS_PENDING = "GET_MORE_COINS_PENDING";
export const GET_MORE_COINS_SUCCESS = "GET_MORE_COINS_SUCCESS";
export const GET_MORE_COINS_FAILED = "GET_MORE_COINS_FAILED";
export const GET_CHART_DATA_PENDING = "GET_CHART_DATA_PENDING";
export const GET_CHART_DATA_SUCCESS = "GET_CHART_DATA_SUCCESS";
export const GET_CHART_DATA_FAILED = "GET_CHART_DATA_FAILED";
export const MARKET_DAYS_CLICK = "MARKET_DAYS_CLICK";
export const SORT_ITEMS = "SORT_ITEMS";
export const SORT_AT_TOP = "SORT_AT_TOP";

export default function coinsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COINS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_COINS_SUCCESS:
      return {
        ...state,
        loading: false,
        coins: action.payload,
      };
    case GET_COINS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    case GET_MORE_COINS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_MORE_COINS_SUCCESS:
      if (!action.payload.length) {
        return {
          ...state,
          loading: false,
          hasMore: false
        };
      } else {
        return {
          ...state,
          loading: false,
          coins: [...state.coins, ...action.payload],
          page: state.page + 1,
        };
      }
    case GET_MORE_COINS_FAILED:
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
      };
    case GET_CHART_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        chartData: action.payload,
      }
    case GET_CHART_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    case MARKET_DAYS_CLICK:
      const marketDaysObj = {
        "1d": 1,
        "1w": 6,
        "1m": 29,
        "3m": 89,
        "6m": 179,
        "1y": 364,
      };
      const marketDayArry = Object.entries(marketDaysObj).map((entry) => {
          const [key] = entry;
          return key === action.payload ? marketDaysObj[action.payload] : null
        }).filter((el) => el !== null)
      const newMarketDay = marketDayArry.length ? marketDayArry.reduce((c) => c) : {...state.marketDays}
      return {
        ...state,
        marketDays: newMarketDay
      }
    case SORT_ITEMS:
      const newSort = Object.entries(state.sort)
        .map((entry) => {
          const [key, value] = entry;
          if (key === action.payload) {
            return {
              [key]: value !== true,
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
        sortBy: "BY MARKET CAP",
        sort: newSort,
      };
    case SORT_AT_TOP:
      const sortNew = Object.entries(state.sort)
        .map((entry) => {
          const [key] = entry;
          return {
            [key]: null,
          };
        })
        .reduce((acc, element) => ({ ...acc, ...element }), {});
      if (state.sortBy === "BY MARKET CAP") {
        return {
          ...state,
          sort: sortNew,
          sortBy: "BY VOLUME",
        };
      } else {
            return {
            ...state,
            sort: sortNew,
            sortBy: "BY MARKET CAP",
            };
      }
    default:
      return state;
  }
}

export const getPage = (state) => state.coins.page

export const getMarketDays = (state) => state.coins.marketDays