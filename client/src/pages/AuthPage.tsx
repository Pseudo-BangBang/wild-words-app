import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate('/');
    };

    return (
        <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                {isLogin ? (
                    <LoginForm
                        onSuccess={handleSuccess}
                        onSwitchToRegister={() => setIsLogin(false)}
                    />
                ) : (
                    <RegisterForm
                        onSuccess={handleSuccess}
                        onSwitchToLogin={() => setIsLogin(true)}
                    />
                )}
            </div>

        </div>
    );
};
