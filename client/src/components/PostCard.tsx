import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types';

interface PostCardProps {
    post: Post;
    showAuthor?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showAuthor = true }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateContent = (content: string, maxLength: number = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    return (
        <article className="backdrop-blur-md bg-card/25 z-10 border border-border rounded-lg p-6 mb-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 leading-tight">
                    <Link
                        to={`/posts/${post.id}`}
                        className="text-foreground no-underline transition-colors hover:text-primary"
                    >
                        {post.title}
                    </Link>
                </h3>
                <div className="flex items-start gap-1 sm:gap-4 text-sm text-muted-foreground flex-col sm:flex-row mt-4 sm:mt-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${post.published
                        ? 'bg-primary text-background'
                        : 'bg-yellow-100 text-accent'
                        }`}>
                        {post.published ? 'Published' : 'Draft'}
                    </span>
                    <time className="italic" dateTime={post.createdAt}>
                        {formatDate(post.createdAt)}
                    </time>
                </div>
            </div>

            <div className="mb-4 leading-relaxed text-muted-foreground">
                <p className="mb-0">{truncateContent(post.content)}</p>
            </div>

            {showAuthor && post.author && (
                <div className="mb-4 text-sm text-muted-foreground">
                    <span>By </span>
                    <Link
                        to={`/users/${post.author.id}`}
                        className="text-primary no-underline font-medium transition-colors hover:text-primary/80 hover:underline"
                    >
                        {post.author.name}
                    </Link>
                </div>
            )}

            <div className="flex justify-end">
                <Link
                    to={`/posts/${post.id}`}
                    className="text-primary no-underline font-medium px-4 py-2 border border-primary rounded transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                >
                    Read More
                </Link>
            </div>
        </article>
    );
};

export default PostCard;
