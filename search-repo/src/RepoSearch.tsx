import { ApolloClient, QueryResult } from '@apollo/client';
import { Mutation } from '@apollo/client/react/components';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { loader } from 'graphql.macro';

const GET_REPO = loader('./query-repo.graphql');
const STAR_REPO = loader('./mutation-repo.graphql');

interface IProps {
    client: ApolloClient<any>;
}

interface ISearch {
    orgName: string;
    repoName: string;
}

interface IRepo {
    id: string;
    name: string;
    description: string;
    viewerHasStarred: boolean;
    stargazers: {
        totalCount: number;
    };
    issues: {
        edges: [
            {
                node: {
                    id: string;
                    title: string;
                    url: string;
                };
            }
        ];
    };
}

const defaultRepo: IRepo = {
    id: '',
    name: '',
    description: '',
    viewerHasStarred: false,
    stargazers: {
        totalCount: 0,
    },
    issues: {
        edges: [
            {
                node: {
                    id: '',
                    title: '',
                    url: '',
                },
            },
        ],
    },
};

interface IQueryResult extends QueryResult {
    repository: IRepo;
}

export const RepoSearch: FC<IProps> = ({ client }) => {
    const [repo, setRepo] = useState<IRepo>(defaultRepo);
    const [error, setError] = useState<string>('');
    const [search, setSearch] = useState<ISearch>({
        orgName: '',
        repoName: '',
    });
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        client
            .query<IQueryResult, ISearch>({
                query: GET_REPO,
                variables: search,
            })
            .then((resp) => {
                setRepo(resp.data.repository);
            })
            .catch((err) => {
                setError(err.message);
                setRepo(defaultRepo);
            });

        setError('');
    };
    const handleOrgChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value: orgName } = e.currentTarget;
        setSearch((state) => ({ ...state, orgName }));
    };
    const handleRepoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value: repoName } = e.currentTarget;
        setSearch((state) => ({ ...state, repoName }));
    };

    return (
        <div className="repo-search">
            <form onSubmit={handleSearch}>
                <label htmlFor="orgName">Organization</label>
                <input
                    type="text"
                    name="orgName"
                    value={search.orgName}
                    onChange={handleOrgChange}
                />
                <label htmlFor="repoName">Repository</label>
                <input
                    type="text"
                    name="repoName"
                    value={search.repoName}
                    onChange={handleRepoChange}
                />
                <button type="submit">Submit</button>
            </form>

            {repo.id && (
                <div className="repo-item">
                    <h4>
                        {repo.name}
                        {repo.stargazers
                            ? ` ${repo.stargazers.totalCount} stars`
                            : ''}
                    </h4>
                    <p>{repo.description}</p>
                    <div>
                        {!repo.viewerHasStarred && (
                            <Mutation
                                mutation={STAR_REPO}
                                variables={{
                                    repoId: repo.id,
                                }}
                                refetchQueries={[
                                    {
                                        query: GET_REPO,
                                        variables: {
                                            orgName: search.orgName,
                                            repoName: search.repoName,
                                        },
                                    },
                                ]}
                            >
                                {(
                                    addStar: any,
                                    {
                                        loading,
                                        error,
                                    }: { loading: boolean; error?: any }
                                ) => (
                                    <div>
                                        {' '}
                                        <button onClick={() => addStar()}>
                                            {loading ? 'Adding ...' : 'Star!'}
                                        </button>
                                        {error && <div>{error.toString()}</div>}
                                    </div>
                                )}
                            </Mutation>
                        )}
                    </div>
                    <div>
                        Last 5 issues:
                        {repo.issues && repo.issues.edges ? (
                            <ul>
                                {repo.issues.edges.map((item) => (
                                    <li key={item.node.id}>
                                        {item.node.title}
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                </div>
            )}
            {error && <div>{error}</div>}
        </div>
    );
};
