export interface IProduct {
	id: number;
	name: string;
	description: string;
	price: number;
}

export const products: IProduct[] = [
	{ id: 1, name: 'name  1', description: 'description 1', price: 10 },
	{ id: 2, name: 'name  2', description: 'description 2', price: 20 },
	{ id: 3, name: 'name  3', description: 'description 3', price: 30 }
];
