import React, { Fragment } from 'react';
import { RouteComponentProps, Prompt } from 'react-router';
import { IProduct, products, getProduct } from './ProductsData';
import { Product } from './Product';

type Props = RouteComponentProps<{ id: string }>;

interface IState {
    product?: IProduct;
    added: boolean;
    loading: boolean;
}

export class ProductPage extends React.Component<Props, IState> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            added: false,
            loading: true,
        };
    }

    handleAddClick = () => {
        this.setState({
            added: true,
        });
    };

    private navAwayMsg = () =>
        'Are you sure you leave without buying this product?';

    public async componentDidMount() {
        const { id } = this.props.match.params;

        if (id) {
            const idNum = window.parseInt(id, 10);
            const product = await getProduct(idNum);

            if (product) {
                this.setState({
                    product,
                    loading: false,
                });
            }
        }
    }

    public render() {
        const product = this.state.product;

        return (
            <div className="page-container">
                <Prompt message={this.navAwayMsg} when={!this.state.added} />
                {product || this.state.loading ? (
                    <Product
                        product={product}
                        loading={this.state.loading}
                        inBasket={this.state.added}
                        onAddToBasket={this.handleAddClick}
                    />
                ) : (
                    <p>Product not found!</p>
                )}
            </div>
        );
    }
}
