import { FC, useReducer } from 'react';
import { IProduct } from '../../products';
import { Tabs, Tab } from '../../pageStructure/Tabs';
import { withLoader } from '../../pageStructure/hoc/withLoader';

interface IProps {
    product?: IProduct;
    inBasket: boolean;
    onAddToBasket: () => void;
}

interface ILikeState {
    likes: number;
    lastLike: Date | null;
}

const initialLikeState: ILikeState = {
    likes: 0,
    lastLike: null,
};

enum LikeActionsType {
    LIKE = 'LIKE',
}
interface ILikeAction {
    type: LikeActionsType.LIKE;
    now: Date;
}

type LikeActions = ILikeAction;

const reducer = (state: ILikeState, action: LikeActions): ILikeState => {
    switch (action.type) {
        case LikeActionsType.LIKE:
            return {
                likes: state.likes + 1,
                lastLike: action.now,
            };
    }
    return state;
};

export const ProductBare: FC<IProps> = ({
    product,
    inBasket,
    onAddToBasket,
}) => {
    const [{ likes, lastLike }, dispatch]: [
        ILikeState,
        (action: LikeActions) => void
    ] = useReducer(reducer, initialLikeState);

    const handleAddClick = () => {
        onAddToBasket();
    };
    const handleLikeClick = () => {
        dispatch({ type: LikeActionsType.LIKE, now: new Date() });
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
            <div className="like-container">
                {likes > 0 && (
                    <div>{`I like this x ${likes}, last at ${lastLike}`}</div>
                )}
                <button onClick={handleLikeClick}>
                    {likes > 0 ? 'Like again' : 'Like'}
                </button>
            </div>
        </>
    );
};

export const Product = withLoader(ProductBare);
