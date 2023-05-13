import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';
import venueSet from "./reducers/venueRed/venueSet";
import {persistStore, persistReducer, createTransform} from 'redux-persist';

const reducers = combineReducers({
  venueSet,
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
      
    ],
  };

const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,{},composeEnhancers(applyMiddleware(ReduxThunk)));

let persistor = persistStore(store);
export {persistor,store}