import React, { useEffect, useState } from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from '../../../logo.svg';

import './index.css';

export const HeaderBare: React.FunctionComponent<RouteComponentProps> = (
	props
) => {
	const [search, setSearch] = useState('');

	useEffect(() => {
		const searchParams = new URLSearchParams(props.location.search);
		setSearch(searchParams.get('search') || '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.currentTarget.value);
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			props.history.push(
				search ? `products?search=${search}` : 'products'
			);
		}
	};

	return (
		<header className="header">
			<div className="search-container">
				<input
					type="search"
					value={search}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<img src={logo} className="header-logo" alt="logo" />
			<h1 className="header-title">React Shop</h1>
			<nav>
				<NavLink
					to="/products"
					activeClassName="header-link-active"
					className="header-link"
				>
					Products
				</NavLink>
				<NavLink
					to="/admin"
					activeClassName="header-link-active"
					className="header-link"
				>
					Admin
				</NavLink>
			</nav>
		</header>
	);
};

export const Header = withRouter(HeaderBare);
