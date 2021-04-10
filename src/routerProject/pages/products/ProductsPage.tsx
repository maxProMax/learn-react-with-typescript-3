import React from 'react';
import { IProduct, products } from './ProductsData';
import { Link, RouteComponentProps } from 'react-router-dom';

interface IState {
	products: IProduct[];
	search?: string;
}

const isMatchSearch = ({ name }: IProduct, search = ''): boolean =>
	name.includes(search.toLowerCase());

export class ProductsPage extends React.Component<RouteComponentProps, IState> {
	public constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			products: [],
			search: ''
		};
	}

	public static getDerivedStateFromProps(
		props: RouteComponentProps,
		state: IState
	) {
		const searchParams = new URLSearchParams(props.location.search);
		const search = searchParams.get('search') || '';

		return {
			products: state.products,
			search
		};
	}

	public componentDidMount() {
		this.setState({ products });
	}

	public render() {
		const search = this.state.search;

		return (
			<div className="page-container">
				<p>
					Welcome to React Shop where you can get all your tools for
					ReactJS!
				</p>
				<ul className="product-list">
					{this.state.products.map((product) =>
						isMatchSearch(product, search) ? (
							<li key={product.id} className="product-list-item">
								<Link to={`products/${product.id}`}>
									{product.name}
								</Link>
							</li>
						) : null
					)}
				</ul>
			</div>
		);
	}
}
