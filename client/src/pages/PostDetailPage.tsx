import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '@/graphql/queries';
import LoadingSpinner from '@/components/LoadingSpinner';

const PostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const postId = id ? parseInt(id, 10) : 0;

    const { data, loading, error } = useQuery(GET_POST_BY_ID, {
        variables: { id: postId },
        skip: !postId,
    });

    if (loading) return <LoadingSpinner />;
    if (error) return (
        <div className="text-center py-12">
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                Error loading post: {error.message}
            </div>
        </div>
    );
    if (!data?.post) return (
        <div className="text-center py-12">
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                Post not found
            </div>
        </div>
    );

    const post = data.post;
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-8 mb-8 bg-card/25 backdrop-blur-md border border-border rounded-lg shadow-lg">
            <div className="mb-8 pb-6 border-b-2 border-border">
                <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
                <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
                    <span className={`px-3 py-1 rounded-full font-semibold text-xs uppercase tracking-wide ${post.published
                        ? 'bg-primary text-background'
                        : 'bg-yellow-100 text-accent'
                        }`}>
                        {post.published ? 'Published' : 'Draft'}
                    </span>
                    <time className="text-muted-foreground" dateTime={post.createdAt}>
                        {formatDate(post.createdAt)}
                    </time>
                    {post.updatedAt !== post.createdAt && (
                        <time className="text-muted-foreground" dateTime={post.updatedAt}>
                            Updated: {formatDate(post.updatedAt)}
                        </time>
                    )}
                </div>
            </div>

            {post.author && (
                <div className="mb-8 text-lg text-muted-foreground">
                    <span>By </span>
                    <Link
                        to={`/users/${post.author.id}`}
                        className="text-primary no-underline font-semibold transition-colors hover:text-primary/80 hover:underline"
                    >
                        {post.author.name}
                    </Link>
                </div>
            )}

            <div className="mb-12 leading-relaxed text-lg text-foreground">
                <p className="mb-0 whitespace-pre-wrap">{post.content}</p>
            </div>

            <div className="flex gap-4 items-center pt-8 border-t-2 border-border flex-col sm:flex-row">
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-accent text-primary-foreground no-underline rounded-md font-semibold transition-colors hover:opacity-90 w-full sm:w-auto justify-center"
                >
                    ← Back to All Posts
                </Link>
                <Link
                    to={`/users/${post.author?.id}`}
                    className="text-primary no-underline font-semibold transition-colors hover:text-primary/80 hover:underline w-full sm:w-auto text-center"
                >
                    View Author Profile
                </Link>
            </div>
        </div>
    );
};

export default PostDetailPage;
