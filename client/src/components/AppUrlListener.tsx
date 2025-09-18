import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';

const AppUrlListener: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAppUrlOpen = (event: URLOpenListenerEvent) => {
            console.log('Deep link received:', event.url);

            let path = "/";

            // Handle custom URL schemes (wildwords://)
            if (event.url.startsWith("wildwords://")) {
                const urlPath = event.url.replace("wildwords://", "");
                path = urlPath ? `/${urlPath}` : "/";
            }
            // Handle HTTP/HTTPS URLs
            else if (event.url.startsWith("http")) {
                try {
                    const url = new URL(event.url);
                    path = url.pathname;
                } catch (error) {
                    console.error("Error parsing URL:", error);
                }
            }

            console.log('Navigating to path:', path);

            // Navigate to the extracted path
            if (path && path !== '/') {
                navigate(path);
            } else {
                navigate('/');
            }
        };

        // Add the listener
        App.addListener('appUrlOpen', handleAppUrlOpen);


    }, [navigate]);

    return null;
};

export default AppUrlListener;
