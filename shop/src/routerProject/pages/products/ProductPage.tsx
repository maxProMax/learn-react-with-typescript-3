import React from 'react';
import { RouteComponentProps, Prompt } from 'react-router';

import { connect } from 'react-redux';
import { IApplicationState } from '../../Store';
import { addToBasket, basketReducer } from '../../basket';
import { getProduct, IProduct } from '../../products';

// import { IProduct } from '../../products';
// import { getProduct } from '../../products/ProductsData';
import { Product } from './Product';

interface IProps extends RouteComponentProps<{ id: string }> {
    addToBasket: typeof addToBasket;
    getProduct: typeof getProduct;
    loading: boolean;
    product?: IProduct;
    added: boolean;
}

// interface IState {
//     product?: IProduct;
//     added: boolean;
//     loading: boolean;
// }

export class ProductPageBare extends React.Component<IProps> {
    // public constructor(props: IProps) {
    //     super(props);

    //     this.state = {
    //         added: false,
    //         loading: true,
    //     };
    // }

    handleAddClick = () => {
        if (this.props.product) {
            this.props.addToBasket(this.props.product);
        }
    };

    private navAwayMsg = () =>
        'Are you sure you leave without buying this product?';

    public async componentDidMount() {
        const { id } = this.props.match.params;

        if (id) {
            const idNum = window.parseInt(id, 10);
            this.props.getProduct(idNum);
        }
    }

    public render() {
        const product = this.props.product;

        return (
            <div className="page-container">
                <Prompt message={this.navAwayMsg} when={!this.props.added} />
                {product || this.props.loading ? (
                    <Product
                        product={product}
                        loading={this.props.loading}
                        inBasket={this.props.added}
                        onAddToBasket={this.handleAddClick}
                    />
                ) : (
                    <p>Product not found!</p>
                )}
            </div>
        );
    }
}

const mapPropsToState = (state: IApplicationState) => ({
    added: state.basket.products.some((p) =>
        state.products.currentProduct
            ? p.id === state.products.currentProduct.id
            : false
    ),
    baskeProducts: state.basket.products,
    loading: state.products.productsLoading,
    product: state.products.currentProduct || undefined,
});
const mapDispatchToProps = (dispatch: any) => ({
    addToBasket: (product: IProduct) => dispatch(addToBasket(product)),
    getProduct: (id: number) => dispatch(getProduct(id)),
});

export const ProductPage = connect(
    mapPropsToState,
    mapDispatchToProps
)(ProductPageBare);
