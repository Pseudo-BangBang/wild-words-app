import React from 'react';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <div className="hidden md:block absolute inset-0 bg-[url('/images/pexels-lastly-808465.jpg')] bg-cover bg-center opacity-20 pointer-events-none fixed" />
            <div className="md:hidden inset-0 bg-[url('/images/pexels-artur-roman-158558-539711.jpg')] bg-cover bg-center opacity-25 pointer-events-none fixed" />
            <Header />
            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4">
                    {children}
                </div>
            </main>
            <footer className="bg-primary text-background text-center py-4 mt-auto z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <p className="mb-0 opacity-80">&copy; 2025 Wild Words Demo. Built with ❤️ & ☕️.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
