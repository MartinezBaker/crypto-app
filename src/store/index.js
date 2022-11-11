import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import coinsReducer from "./Coins/reducer";
import coinPageReducer from "./CoinPage/reducer";
import mainReducer from "./Main/reducer";
import portfolioReducer from "./Portfolio/reducer";

const mainPersistConfig = {
  key: "main",
  version: 1,
  storage,
  blacklist: ["savedCoinId", "path", "globalInfo"]
}

const coinsPersistConfig = {
  key: "main",
  version: 1,
  storage,
  blacklist: ["page", "coins", "sort", "sortBy"]
};

const rootReducer = combineReducers({
  coins: persistReducer(coinsPersistConfig, coinsReducer),
  coinPage: coinPageReducer,
  portfolio: portfolioReducer,
  main: persistReducer(mainPersistConfig, mainReducer)
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [ "portfolio", "coinPage"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }),
});

export default store;