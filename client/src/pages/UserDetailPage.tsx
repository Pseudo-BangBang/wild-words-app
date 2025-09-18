import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/queries';
import LoadingSpinner from '@/components/LoadingSpinner';
import PostCard from '@/components/PostCard';
import { useCurrentUser } from '@/hooks/useAuth';

const UserDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const userId = id ? parseInt(id, 10) : 0;
    const { user: currentUser } = useCurrentUser();

    const { data, loading, error } = useQuery(GET_USER, {
        variables: { id: userId },
        skip: !userId,
    });

    if (loading) return <LoadingSpinner />;
    if (error) return (
        <div className="text-center py-12">
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                Error loading user: {error.message}
            </div>
        </div>
    );
    if (!data?.user) return (
        <div className="text-center py-12">
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                User not found
            </div>
        </div>
    );

    const user = data.user;


    const isOwnProfile = currentUser && currentUser.id === userId.toString();
    const filteredPosts = user.posts ? user.posts.filter((post: any) =>
        post.published || isOwnProfile
    ) : [];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-card/25 backdrop-blur-md border border-border rounded-lg shadow-lg mb-8">
            <div className="mb-12 pb-8 border-b-2 border-border text-center">
                <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">{user.name}</h1>
                <div className="text-muted-foreground">
                    <p className="text-xl mb-2 text-primary">{user.email}</p>
                    <p className="text-base italic">
                        Joined {formatDate(user.createdAt)}
                    </p>
                </div>
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-8 pb-2 border-b border-border">
                    {isOwnProfile ? 'Your Posts' : `Posts by ${user.name}`}
                </h2>
                {filteredPosts && filteredPosts.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                        {filteredPosts.map((post: any) => (
                            <PostCard key={post.id} post={post} showAuthor={false} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-8 bg-muted rounded-lg border-2 border-dashed border-border">
                        <p className="text-lg text-muted-foreground mb-6">
                            {isOwnProfile ? 'You haven\'t written any posts yet.' : 'No posts yet.'}
                        </p>
                        <Link
                            to="/create-post"
                            className="inline-block px-6 py-3 bg-primary text-primary-foreground no-underline rounded-md font-semibold transition-colors hover:opacity-90"
                        >
                            {isOwnProfile ? 'Write Your First Post' : 'Create First Post'}
                        </Link>
                    </div>
                )}
            </div>

            <div className="flex gap-4 items-center justify-center pt-8 border-t border-border flex-col sm:flex-row">
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground no-underline rounded-md font-semibold transition-colors hover:opacity-90 w-full sm:w-auto justify-center"
                >
                    View Posts
                </Link>
                <Link
                    to="/users"
                    className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground no-underline rounded-md font-semibold transition-colors hover:opacity-90 w-full sm:w-auto justify-center"
                >
                    View All Users
                </Link>
            </div>
        </div>
    );
};

export default UserDetailPage;
