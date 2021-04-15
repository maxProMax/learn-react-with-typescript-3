import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface IPost {
    userId: number;
    id?: string;
    title: string;
    body: string;
}

console.log(1);

const defaultProps: IPost[] = [];

const App: FC = () => {
    const [posts, setPosts] = useState<IPost[]>(defaultProps);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [editPost, setEditPost] = useState<IPost>({
        userId: 1,
        title: '',
        body: '',
    });

    const handleTitleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { value: title } = e.currentTarget;

            setEditPost((state) => ({ ...state, title }));
        },
        []
    );
    const handleBodyChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            const { value: body } = e.currentTarget;

            setEditPost((state) => ({ ...state, body }));
        },
        []
    );
    const handleSaveChange = () => {
        if (editPost.id) {
            axios
                .put<IPost>(
                    `https://jsonplaceholder.typicode.com/posts/${editPost.id}`,
                    editPost
                )
                .then((resp) => {
                    setEditPost({
                        userId: 1,
                        title: '',
                        body: '',
                    });
                    setPosts((state) => [
                        resp.data,
                        ...state.filter((post) => post.id !== resp.data.id),
                    ]);
                });
        } else {
            axios
                .post<IPost>(
                    'https://jsonplaceholder.typicode.com/posts',
                    editPost
                )
                .then((resp) => setPosts((state) => [resp.data, ...state]));
        }
    };
    const handleUpdateClick = (editPost: IPost) => setEditPost(editPost);
    const handleDeleteClick = (post: IPost) => {
        axios
            .delete<IPost>(
                `https://jsonplaceholder.typicode.com/posts/${post.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() =>
                setPosts((state) => state.filter((p) => p.id !== post.id))
            );
    };

    useEffect(() => {
        axios
            .get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
            .then((resp) => {
                setPosts(resp.data);
                setLoading(false);
            })
            .catch((err) => {
                const error =
                    err.response.status === 404
                        ? 'Resource not found'
                        : 'An unexpected error has occurred';

                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="App">
            <div className="post-edit">
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={editPost.title}
                    onChange={handleTitleChange}
                />
                <textarea
                    placeholder="Enter Body"
                    value={editPost.body}
                    onChange={handleBodyChange}
                />
                <button onClick={handleSaveChange}>Save</button>
            </div>
            <ul className="posts">
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <button onClick={() => handleUpdateClick(post)}>
                            Update
                        </button>
                        <button onClick={() => handleDeleteClick(post)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default App;
