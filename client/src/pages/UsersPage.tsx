import React from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';
import LoadingSpinner from '@/components/LoadingSpinner';

const UsersPage: React.FC = () => {
    const { users, loading, error } = useUsers();

    if (loading) {
        return <LoadingSpinner size="large" message="Loading users..." />;
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-destructive mb-4">Error loading users</h2>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-6xl mx-auto mb-8">
            <header className="text-center md:mb-12 mb-8 py-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl">
                <h1 className="text-4xl font-bold mb-2">Users</h1>
                <p className="text-lg opacity-90">Meet our community members</p>
            </header>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {users.length === 0 ? (
                    <div className="col-span-full text-center py-16 px-8 bg-muted rounded-lg border-2 border-dashed border-border">
                        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No users yet</h3>
                        <p className="text-muted-foreground">Users will appear here once they join the community.</p>
                    </div>
                ) : (
                    users.map((user: any) => (
                        <div key={user.id} className="bg-card/25 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col items-center text-center">
                            <div className="w-15 h-15 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 text-2xl font-bold text-primary-foreground">
                                <span>{user.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="flex-1 mb-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    <Link
                                        to={`/users/${user.id}`}
                                        className="text-foreground no-underline transition-colors hover:text-primary"
                                    >
                                        {user.name}
                                    </Link>
                                </h3>
                                <p className="text-muted-foreground text-sm mb-2">{user.email}</p>
                                <p className="text-muted-foreground text-xs italic">
                                    Joined {formatDate(user.createdAt)}
                                </p>
                            </div>
                            <div className="w-full">
                                <Link
                                    to={`/users/${user.id}`}
                                    className="inline-block w-full bg-primary text-primary-foreground no-underline px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 text-center"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UsersPage;
