import { FC } from 'react';
import gql from 'graphql-tag';
import { useQuery, QueryResult } from '@apollo/client';

interface IViewer {
    name: string;
    avatarUrl: string;
    email: string;
}

/** IMPORTANT! for having error and other types
 * need extends QueryResult from '@apollo/client'
 */
interface IQueryResult extends QueryResult {
    viewer: IViewer;
}

const GET_VIEWER = gql`
    query {
        viewer {
            name
            avatarUrl
            email
        }
    }
`;

export const Header: FC = () => {
    const { data, loading, error } = useQuery<IQueryResult>(GET_VIEWER);

    return error ? (
        <div>{error.message}</div>
    ) : loading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <img
                src={data?.viewer.avatarUrl}
                alt="git repo"
                className="avatar"
            />
            <div className="viewer">{data?.viewer.avatarUrl}</div>
            <h1>GitHub Search</h1>
        </div>
    );
};
