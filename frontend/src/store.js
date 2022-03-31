import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  productDetailReducer,
  produListReducer,
} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";

const initialState = {
  userSignin: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  itemList: produListReducer,
  itemDetails: productDetailReducer,
  userSignin: userReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
