import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/graphql/client';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import AppUrlListener from '@/components/AppUrlListener';
import HomePage from '@/pages/HomePage';
import UsersPage from '@/pages/UsersPage';
import CreatePostPage from '@/pages/CreatePostPage';
import PostDetailPage from '@/pages/PostDetailPage';
import UserDetailPage from '@/pages/UserDetailPage';
import { AuthPage } from '@/pages/AuthPage';
import DeepLinkDemoPage from '@/pages/DeepLinkDemoPage';
import './App.css';

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <ErrorBoundary>
                    <Router>
                        <AppUrlListener />
                        <Layout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/users" element={<UsersPage />} />
                                <Route path="/users/:id" element={<UserDetailPage />} />
                                <Route path="/create-post" element={
                                    <ProtectedRoute>
                                        <CreatePostPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/posts/:id" element={<PostDetailPage />} />
                                <Route path="/auth" element={<AuthPage />} />
                                <Route path="/deeplink-demo" element={<DeepLinkDemoPage />} />
                                <Route path="/deeplink-demo/:id" element={<DeepLinkDemoPage />} />
                            </Routes>
                        </Layout>
                    </Router>
                </ErrorBoundary>
            </AuthProvider>
        </ApolloProvider>
    );
};

export default App;
