import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
} from "../constants/Constant";

export const produListReducer = (
    state = { loading: true, itemList: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };

        case PRODUCT_LIST_SUCCESS:
            return { itemList: action.payload, loading: false };

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const productDetailReducer = (
    state = { loading: true, item: {} },
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };

        case PRODUCT_DETAILS_SUCCESS:
            return { item: action.payload };

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const productUpdateReducer = (
    state = { loading: true, item: {} },
    action
) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };

        case PRODUCT_UPDATE_SUCCESS:
            return { item: action.payload };

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};