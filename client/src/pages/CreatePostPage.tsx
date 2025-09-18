import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '@/hooks/usePosts';
import { useCurrentUser } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

const CreatePostPage: React.FC = () => {
    const navigate = useNavigate();
    const { createPost } = usePosts();
    const { user, isAuthenticated, loading: authLoading } = useCurrentUser();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        published: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (!formData.title.trim() || !formData.content.trim()) {
                throw new Error('Please fill in all required fields');
            }

            if (!user) {
                throw new Error('You must be logged in to create a post');
            }

            await createPost({
                title: formData.title.trim(),
                content: formData.content.trim(),
                authorId: user.id,
                published: formData.published
            });

            if (!formData.published) {
                navigate(`/users/${user.id}`);
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while creating the post');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading) {
        return <LoadingSpinner size="large" message="Loading..." />;
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="max-w-6xl mx-auto">
                <div className="text-center py-12">
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                        <p className="mb-0">You must be logged in to create a post.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mb-8">
            <header className="text-center md:mb-12 mb-8 py-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl">
                <h1 className="text-4xl font-bold mb-2">Create New Post</h1>
                <p className="text-lg opacity-90">Share your thoughts with the community</p>
                <p className="mt-2 text-base opacity-80">
                    Posting as: <strong className="text-primary-foreground font-semibold">{user.name}</strong>
                </p>
            </header>

            <div className="bg-card/25 border border-border rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
                <form onSubmit={handleSubmit} className="p-8">
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
                            <p className="mb-0">{error}</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <label htmlFor="title" className="block mb-2 font-medium text-foreground">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-input-background border border-input rounded-md text-base transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Enter post title"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="content" className="block mb-2 font-medium text-foreground">
                            Content *
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-input-background border border-input rounded-md text-base transition-colors resize-y min-h-[200px] focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Write your post content here..."
                            rows={8}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center cursor-pointer font-medium text-foreground">
                            <input
                                type="checkbox"
                                name="published"
                                checked={formData.published}
                                onChange={handleInputChange}
                                className="mr-2 w-5 h-5 cursor-pointer"
                            />
                            <span className="select-none">Publish immediately</span>
                        </label>
                    </div>

                    <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-border flex-col sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-accent text-destructive-foreground rounded-md font-medium transition-colors hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostPage;
