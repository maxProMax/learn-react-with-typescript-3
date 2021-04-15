import React, { useEffect, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IApplicationState, getProducts } from '../../products';
import { IProduct } from '../../products';
import { ProductsList } from './ProductsList';
import './index.css';

interface IProps extends RouteComponentProps {
    getProducts: typeof getProducts;
    loading: boolean;
    products: IProduct[];
}

const ProductsPageBare: FC<IProps> = ({
    location,
    loading,
    products,
    getProducts,
}) => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="page-container">
            <p>
                Welcome to React Shop where you can get all your tools for
                ReactJS!
            </p>
            <ProductsList
                search={search}
                loading={loading}
                products={products}
            />
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    loading: state.products.productsLoading,
    products: state.products.products,
});

const mapDispatchToProps = (dispatch: any) => ({
    getProducts: () => dispatch(getProducts()),
});

export const ProductsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsPageBare);
