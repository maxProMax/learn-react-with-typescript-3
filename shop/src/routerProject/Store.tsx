import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { productsReducer } from './products/ProductsReducer';
import { IProductsState } from './products/ProductsTypes';
import { basketReducer, IBasketState } from './basket';

export interface IApplicationState {
    products: IProductsState;
    basket: IBasketState;
}

const rootReducer = combineReducers<IApplicationState>({
    products: productsReducer,
    basket: basketReducer,
});

export function configStore(): Store<IApplicationState> {
    return createStore(rootReducer, undefined, applyMiddleware(thunk));
}
