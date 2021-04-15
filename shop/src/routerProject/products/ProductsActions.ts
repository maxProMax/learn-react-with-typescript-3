import { ActionCreator, AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    getProducts as getProductsFromApi,
    getProduct as getPoductFromApi,
} from './ProductsData';
import {
    IProductsGetAllAction,
    IProductsLoadingAction,
    ProductsActionType,
    IProductsState,
    IProductsSingleAction,
} from './ProductsTypes';

export const loading: ActionCreator<IProductsLoadingAction> = () => ({
    type: ProductsActionType.LOADING,
});

export const getProducts: ActionCreator<
    ThunkAction<Promise<AnyAction>, IProductsState, null, IProductsGetAllAction>
> = () => async (dispatch: Dispatch) => {
    dispatch(loading());
    const products = await getProductsFromApi();

    return dispatch({
        products,
        type: ProductsActionType.GET_ALL,
    });
};

export const getProduct: ActionCreator<
    ThunkAction<Promise<AnyAction>, IProductsState, null, IProductsSingleAction>
> = (id: number) => async (dispatch: Dispatch) => {
    dispatch(loading());
    const product = await getPoductFromApi(id);

    return dispatch({
        product,
        type: ProductsActionType.GET_SINGLE,
    });
};
