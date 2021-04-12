import { FC } from 'react';
import { IProduct } from './ProductsData';
import { Tabs, Tab } from '../../pageStructure/Tabs';
import { withLoader } from '../../pageStructure/hoc/withLoader';

interface IProps {
    product?: IProduct;
    inBasket: boolean;
    onAddToBasket: () => void;
}

export const ProductBare: FC<IProps> = ({
    product,
    inBasket,
    onAddToBasket,
}) => {
    const handleAddClick = () => {
        onAddToBasket();
    };
    if (!product) {
        return null;
    }
    return (
        <>
            <h1>{product.name}</h1>
            <Tabs>
                <Tab
                    name="Description"
                    initialActive
                    heading={() => <b>Description</b>}
                >
                    <p>{product.description}</p>
                </Tab>
                <Tab name="Reviews" heading={() => <b>Reviews</b>}>
                    <ul className="product-reviews">
                        {product.reviews.map((review, i) => (
                            <li
                                className="product-reviews-item"
                                key={review.reviewer + i}
                            >
                                {review.comment}
                            </li>
                        ))}
                    </ul>
                </Tab>
            </Tabs>

            <p className="product-price">
                {new Intl.NumberFormat('en-US', {
                    currency: 'USD',
                    style: 'currency',
                }).format(product.price)}
            </p>
            {!inBasket && (
                <button onClick={handleAddClick}>Add to basket</button>
            )}
        </>
    );
};

export const Product = withLoader(ProductBare);
