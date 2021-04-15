import { BasketActionTypes, IBasketAdd } from './BasketTypes';
import { IProduct } from '../products';

export const addToBasket = (product: IProduct): IBasketAdd => ({
    type: BasketActionTypes.ADD,
    product,
});
