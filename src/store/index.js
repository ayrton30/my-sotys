import { combineReducers, createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

//reducer
import TracksReducer from "./reducers/TracksReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["sotyTracks"],
};

const persistedReducer = persistReducer(persistConfig, TracksReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
