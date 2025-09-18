import React, { useState } from 'react';
import { useLogin } from '../hooks/useAuth';

interface LoginFormProps {
    onSuccess?: () => void;
    onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-card/25 backdrop-blur-md border border-border rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-semibold mb-6 text-foreground">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium text-foreground">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full px-3 py-2 bg-input-background border border-input rounded-md text-base transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:bg-muted disabled:cursor-not-allowed"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-medium text-foreground">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full px-3 py-2 bg-input-background border border-input rounded-md text-base transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:bg-muted disabled:cursor-not-allowed"
                    />
                </div>

                {error && (
                    <div className="text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2 rounded-md mb-4">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-md text-base font-medium cursor-pointer transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {onSwitchToRegister && (
                <p className="text-center mt-4 text-muted-foreground">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="bg-none border-none text-accent underline cursor-pointer text-base hover:text-primary/80"
                    >
                        Register here
                    </button>
                </p>
            )}
        </div>
    );
};
