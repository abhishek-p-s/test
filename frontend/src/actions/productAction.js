import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  BASE_URL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/Constant";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  try {
    const { data } = await Axios.get(BASE_URL + "/api/list");
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const itemDetails = (id) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
  });

  try {
    const { data } = await Axios.get(BASE_URL + `/api/list/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const itemUpdate = (item) => async (dispatch) => {
  dispatch({
    type: PRODUCT_UPDATE_REQUEST,
  });

  try {
    const { data } = await Axios.put(
      BASE_URL + `/api/list/update/${item.id}`,
      item,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.message,
    });
  }
};

export const itemAdd = (item) => async (dispatch) => {
  dispatch({
    type: PRODUCT_ADD_REQUEST,
  });

  try {
    const { data } = await Axios.post(BASE_URL + `/api/list/add`, item, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload: error.message,
    });
  }
};

export const itemDelete = (id) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
  });

  try {
    const { data } = await Axios.delete(BASE_URL + `/api/list/delete/${id}`);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.message,
    });
  }
};
