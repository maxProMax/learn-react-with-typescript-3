import { IProduct } from './ProductsTypes';

export const products: IProduct[] = [
    {
        id: 1,
        name: 'name  1',
        description: 'description 1',
        price: 10,
        reviews: [
            {
                comment: 'comment 1',
                reviewer: 'reviewer 1',
            },
            {
                comment: 'comment 1.2',
                reviewer: 'reviewer 1.2',
            },
        ],
    },
    {
        id: 2,
        name: 'name  2',
        description: 'description 2',
        price: 20,
        reviews: [
            {
                comment: 'comment 1',
                reviewer: 'reviewer 2',
            },
        ],
    },
    {
        id: 3,
        name: 'name  3',
        description: 'description 3',
        price: 30,
        reviews: [
            {
                comment: 'comment 1',
                reviewer: 'reviewer 3',
            },
        ],
    },
];

const wait = (sec: number): Promise<void> =>
    new Promise((res, rej) => {
        setTimeout(res, sec);
    });

export const getProduct = async (id: number): Promise<IProduct | null> => {
    await wait(1000);
    return products.find((product) => product.id === id) ?? null;
};

export const getProducts = async (): Promise<IProduct[]> => {
    await wait(1000);

    return products;
};
