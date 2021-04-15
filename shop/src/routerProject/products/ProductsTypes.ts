export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    reviews: IReview[];
}

export interface IReview {
    comment: string;
    reviewer: string;
}

export enum ProductsActionType {
    GET_ALL = 'PRODUCTS/GET_ALL',
    GET_SINGLE = 'PRODUCTS/GET_SINGLE',
    LOADING = 'PRODUCTS/LOADING',
}

export interface IProductsGetAllAction {
    type: ProductsActionType.GET_ALL;
    products: IProduct[];
}

export interface IProductsSingleAction {
    type: ProductsActionType.GET_SINGLE;
    product: IProduct;
}

export interface IProductsLoadingAction {
    type: ProductsActionType.LOADING;
}

export type ProductsActions =
    | IProductsGetAllAction
    | IProductsLoadingAction
    | IProductsSingleAction;

export interface IProductsState {
    readonly products: IProduct[];
    readonly productsLoading: boolean;
    readonly currentProduct: IProduct | null;
}
