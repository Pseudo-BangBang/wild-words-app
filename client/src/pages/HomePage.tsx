import React, { useEffect, useRef } from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const {
        posts,
        loading,
        error,
        hasMore,
        isLoadingMore,
        loadMore
    } = usePosts({ publishedOnly: true });

    const heroBgRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;

            if (heroBgRef.current) {
                heroBgRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }

            if (heroContentRef.current) {
                heroContentRef.current.style.transform = `translateY(${scrolled * -parallaxSpeed * 0.5}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) {
        return <LoadingSpinner size="large" message="Loading posts..." />;
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-destructive mb-4">Error loading posts</h2>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <section className="relative h-96 mb-12 rounded-xl overflow-hidden z-10">
                <div
                    ref={heroBgRef}
                    className="absolute inset-0 bg-no-repeat transform-gpu md:top-[-20%] md:h-[140%] hero-bg-desktop hero-bg-mobile"
                    style={{
                        backgroundImage: 'url(/images/pexels-lastly-808465.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        transform: 'translateZ(0)',
                        willChange: 'transform'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                <div className="hidden md:block absolute bottom-0 right-0 w-24 h-24 bg-[url('/logo.png')] bg-cover bg-center grayscale brightness-180 opacity-35" />
                <div className="relative h-full flex items-center">
                    <div
                        ref={heroContentRef}
                        className="max-w-2xl px-8 transform-gpu"
                        style={{
                            transform: 'translateZ(0)',
                            willChange: 'transform'
                        }}
                    >
                        <h1 className="md:text-5xl text-4xl font-bold text-background mb-4 leading-tight">
                            Welcome to Wild Words
                        </h1>
                        <p className="md:text-xl text-base text-background/90 font-bold md:font-semibold mb-6 md:leading-relaxed">
                            Discover, create, and share stories that inspire. Join our community of writers and readers.
                        </p>
                        <div className="flex gap-4">

                            <Link to="/create-post" className="px-6 py-3 bg-white/20 text-background rounded-lg font-semibold transition-all hover:bg-white/30  backdrop-blur-sm border border-white/30 active:scale-95">
                                Start Writing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <header className="text-center mb-12 p-8 bg-primary text-primary-foreground rounded-xl">
                <h2 className="md:text-4xl text-3xl font-bold mb-2">Latest Posts</h2>
                <p className="md:text-lg text-base font-bold md:font-semibold opacity-90">Discover the latest published content from our community</p>
            </header>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 mb-8">
                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-foreground mb-2">No posts yet</h3>
                        <p className="text-muted-foreground">Be the first to create a post!</p>
                    </div>
                ) : (
                    posts.map((post: any) => (
                        <PostCard key={post.id} post={post} />
                    ))
                )}
            </div>

            {hasMore && (
                <div className="text-center mt-8">
                    <button
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={loadMore}
                        disabled={isLoadingMore}
                    >
                        {isLoadingMore ? 'Loading...' : 'Load More Posts'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
