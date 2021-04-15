import { Link } from 'react-router-dom';
import { IProduct } from '../../products';
import { withLoader } from '../../pageStructure/hoc/withLoader';
import { FC } from 'react';

interface IProps {
    products?: IProduct[];
    search: string;
}

const isMatchSearch = ({ name }: IProduct, search = ''): boolean =>
    name.includes(search.toLowerCase());

export const ProductsListBare: FC<IProps> = ({ search, products }) => {
    return (
        <ul className="product-list">
            {products?.map((product) =>
                isMatchSearch(product, search) ? (
                    <li key={product.id} className="product-list-item">
                        <Link to={`products/${product.id}`}>
                            {product.name}
                        </Link>
                    </li>
                ) : null
            )}
        </ul>
    );
};

export const ProductsList = withLoader(ProductsListBare);
