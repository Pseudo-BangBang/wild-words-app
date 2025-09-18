import React from 'react';
import { useCurrentUser, useLogout } from '../hooks/useAuth';

export const UserProfile: React.FC = () => {
    const { user } = useCurrentUser();
    const { logout } = useLogout();

    if (!user) {
        return null;
    }

    return (
        <div className="flex items-center gap-4 px-4 rounded-md ">
            <div className="flex flex-col">
                <span className="font-medium text-secondary-foreground text-sm">Hello, {user.name}!</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
            <button
                onClick={logout}
                className="px-4 py-2 bg-accent text-destructive-foreground border-none rounded text-sm cursor-pointer transition-colors hover:opacity-90"
            >
                Logout
            </button>
        </div>
    );
};
