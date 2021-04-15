import { Reducer } from 'redux';
import {
    ProductsActionType,
    IProductsState,
    ProductsActions,
} from './ProductsTypes';

const initialProdcutsState: IProductsState = {
    products: [],
    productsLoading: false,
    currentProduct: null,
};

export const productsReducer: Reducer<IProductsState, ProductsActions> = (
    state = initialProdcutsState,
    action
): IProductsState => {
    switch (action.type) {
        case ProductsActionType.LOADING:
            return {
                ...state,
                productsLoading: true,
            };
        case ProductsActionType.GET_ALL:
            return {
                ...state,
                productsLoading: false,
                products: action.products,
            };
        case ProductsActionType.GET_SINGLE:
            return {
                ...state,
                currentProduct: action.product,
                productsLoading: false,
            };
        default:
            return state;
    }
};
