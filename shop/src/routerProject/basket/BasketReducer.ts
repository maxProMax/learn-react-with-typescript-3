import { Reducer } from 'redux';
import { BasketActionTypes, IBasketState, BasketActions } from './BasketTypes';

const initialBasketState: IBasketState = {
    products: [],
};

export const basketReducer: Reducer<IBasketState, BasketActions> = (
    state = initialBasketState,
    action
) => {
    switch (action.type) {
        case BasketActionTypes.ADD:
            return {
                ...state,
                products: [...state.products, action.product],
            };
    }
    return state;
};
