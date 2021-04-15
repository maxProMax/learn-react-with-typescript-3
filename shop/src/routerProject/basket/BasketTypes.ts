import { IProduct } from '../products';

export enum BasketActionTypes {
    ADD = 'ABSKET/ADD',
}

export interface IBasketState {
    readonly products: IProduct[];
}

export interface IBasketAdd {
    type: BasketActionTypes.ADD;
    product: IProduct;
}

export type BasketActions = IBasketAdd;
