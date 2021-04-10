import React, { Fragment } from 'react';
import { RouteComponentProps, Prompt } from 'react-router';
import { IProduct, products } from './ProductsData';

type Props = RouteComponentProps<{ id: string }>;

interface IState {
	product?: IProduct;
	added: boolean;
}

export class ProductPage extends React.Component<Props, IState> {
	public constructor(props: Props) {
		super(props);

		this.state = {
			added: false
		};
	}

	handleAddClick = () => {
		this.setState({
			added: true
		});
	};

	private navAwayMsg = () =>
		'Are you sure you leave without buying this product?';

	public componentDidMount() {
		const { id } = this.props.match.params;

		if (id) {
			const idNum = window.parseInt(id, 10);
			this.setState({
				product: products.find((product) => product.id === idNum)
			});
		}
	}

	public render() {
		const product = this.state.product;

		return (
			<div className="page-container">
				<Prompt message={this.navAwayMsg} when={!this.state.added} />
				{product ? (
					<Fragment>
						<h1>{product.name}</h1>
						<p>{product.description}</p>
						<p className="product-price">
							{new Intl.NumberFormat('en-US', {
								currency: 'USD',
								style: 'currency'
							}).format(product.price)}
						</p>
						{!this.state.added && (
							<button onClick={this.handleAddClick}>
								Add to basket
							</button>
						)}
					</Fragment>
				) : (
					<p>Product not found!</p>
				)}
			</div>
		);
	}
}
