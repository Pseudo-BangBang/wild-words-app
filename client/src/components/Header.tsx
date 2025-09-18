import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { useCurrentUser } from '../hooks/useAuth';

const Header: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated } = useCurrentUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/users') {
            return location.pathname === '/users' || location.pathname.startsWith('/users/');
        }
        if (path === '/') {
            return location.pathname === '/' || location.pathname.startsWith('/posts/');
        }
        return location.pathname === path;
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-background text-primary font-bold mt-6 md:mt-0">
            <div className="max-w-6xl mx-auto px-4">
                {/* Desktop Header */}
                <div className="hidden md:flex justify-between items-center py-4">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Link to="/" className="text-primary no-underline flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-22 w-22 object-contain"
                            />
                        </Link>
                    </h1>
                    <nav className="flex gap-4 items-center">
                        <Link
                            to="/"
                            className={`no-underline px-4 py-2 rounded transition-colors ${isActive('/') ? 'text-primary font-black' : 'text-foreground font-normal'
                                }`}
                        >
                            Posts
                        </Link>
                        <Link
                            to="/users"
                            className={`no-underline px-4 py-2 rounded transition-colors ${isActive('/users') ? 'text-primary font-black' : 'text-foreground font-normal'
                                }`}
                        >
                            Users
                        </Link>
                        <Link
                            to="/deeplink-demo"
                            className={`no-underline px-4 py-2 rounded transition-colors ${isActive('/deeplink-demo') ? 'text-primary font-black' : 'text-foreground font-normal'
                                }`}
                        >
                            Deep Links
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/create-post"
                                className={`no-underline px-4 py-2 rounded transition-colors ${isActive('/create-post') ? 'text-primary font-black' : 'text-foreground font-normal'
                                    }`}
                            >
                                Create Post
                            </Link>
                        )}
                        {isAuthenticated ? (
                            <UserProfile />
                        ) : (
                            <Link
                                to="/auth"
                                className="bg-primary text-background no-underline px-4 py-2 rounded font-medium transition-colors hover:opacity-90"
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center py-4">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Link to="/" className="text-primary no-underline flex items-center gap-2" onClick={closeMobileMenu}>
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-16 w-16 object-contain"
                            />
                        </Link>
                    </h1>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-3 rounded-md text-primary hover:bg-muted transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        <div className="w-8 h-8 relative">
                            {/* Hamburger lines */}
                            <span
                                className={`block absolute h-0.75 w-8 bg-current rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
                                    }`}
                                style={{ top: '6px', left: '0' }}
                            />
                            <span
                                className={`block absolute h-0.75 w-8 bg-current rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                                style={{ top: '16px', left: '0' }}
                            />
                            <span
                                className={`block absolute h-0.75 w-8 bg-current rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : 'translate-y-0'
                                    }`}
                                style={{ top: '26px', left: '0' }}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all pb-2 duration-500 ease-in-out backdrop-blur-md !z-50 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="border-t border-border">
                        <nav className="py-4 space-y-2">
                            <Link
                                to="/"
                                className={`block px-4 rounded transition-colors ${isActive('/') ? 'text-primary font-black' : 'text-foreground font-normal'
                                    }`}
                                onClick={closeMobileMenu}
                            >
                                Posts
                            </Link>
                            <Link
                                to="/users"
                                className={`block px-4 rounded transition-colors ${isActive('/users') ? 'text-primary font-black' : 'text-foreground font-normal'
                                    }`}
                                onClick={closeMobileMenu}
                            >
                                Users
                            </Link>
                            <Link
                                to="/deeplink-demo"
                                className={`block px-4 rounded transition-colors ${isActive('/deeplink-demo') ? 'text-primary font-black' : 'text-foreground font-normal'
                                    }`}
                                onClick={closeMobileMenu}
                            >
                                Deep Links
                            </Link>
                            {isAuthenticated && (
                                <Link
                                    to="/create-post"
                                    className={`block px-4 rounded transition-colors ${isActive('/create-post') ? 'text-primary font-black' : 'text-foreground font-normal'
                                        }`}
                                    onClick={closeMobileMenu}
                                >
                                    Create Post
                                </Link>
                            )}
                            <div>
                                {isAuthenticated ? (
                                    <UserProfile />
                                ) : (
                                    <Link
                                        to="/auth"
                                        className="block bg-primary text-background no-underline px-4 py-2 rounded font-medium transition-colors hover:opacity-90 text-center"
                                        onClick={closeMobileMenu}
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
