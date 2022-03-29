import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
    productDetailReducer,
    produListReducer,
} from "./reducers/productReducer";

const initialState = {};

const reducer = combineReducers({
    itemList: produListReducer,
    itemDetails: productDetailReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;