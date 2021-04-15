import React from 'react';
import { NavLink, Route, RouteComponentProps } from 'react-router-dom';
import './index.css';

export const AdminPage: React.FunctionComponent = () => {
	return (
		<div className="page-container">
			<h1>Admin Panel</h1>
			<ul className="admin-section">
				<li>
					<NavLink
						to="/admin/users"
						activeClassName="admin-link-active"
					>
						Users
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/admin/products"
						activeClassName="admin-link-active"
					>
						Products
					</NavLink>
				</li>
			</ul>
			<Route path="/admin/users" component={AdminUsers} />
			<Route path="/admin/users/:id" component={AdminUser} />
			<Route path="/admin/products" component={AdminProducts} />
		</div>
	);
};

const AdminProducts: React.FunctionComponent = () => (
	<div>Some options to administer products</div>
);

interface IUser {
	id: number;
	name: string;
	isAdmin: boolean;
}

const adminUsersData: IUser[] = [
	{
		id: 1,
		name: 'Fred',
		isAdmin: false
	},
	{
		id: 2,
		name: 'Bob',
		isAdmin: false
	},
	{
		id: 3,
		name: 'Jane',
		isAdmin: true
	}
];

const AdminUsers: React.FunctionComponent = () => (
	<ul>
		{adminUsersData.map((user) => (
			<li key={user.id}>
				<NavLink
					to={`/admin/users/${user.id}`}
					activeClassName="admin-link-active"
				>
					{user.name}
				</NavLink>
			</li>
		))}
	</ul>
);

const AdminUser: React.FunctionComponent<
	RouteComponentProps<{ id: string }>
> = (props) => {
	let user: IUser | undefined;

	if (props.match.params.id) {
		const id: number = parseInt(props.match.params.id, 10);

		user = adminUsersData.find((u) => u.id === id);
	} else {
		return null;
	}

	return (
		<div>
			<div>
				<b>Id: </b>
				<span>{user?.id}</span>
			</div>
			<div>
				<b>Is Admin: </b>
				<span>{user?.isAdmin.toString()}</span>
			</div>
		</div>
	);
};
