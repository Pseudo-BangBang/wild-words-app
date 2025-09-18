import React from 'react';


const DeepLinkDemoPage: React.FC = () => {

    const testDeepLinks = [
        {
            title: 'Home Page',
            url: 'wildwords://',
            description: 'Opens the main home page'
        },
        {
            title: 'Users Page',
            url: 'wildwords://users',
            description: 'Opens the users listing page'
        },
        {
            title: 'Create Post',
            url: 'wildwords://create-post',
            description: 'Opens the create post page (requires authentication)'
        },
        {
            title: 'Specific Post',
            url: 'wildwords://posts/1',
            description: 'Opens a specific post detail page'
        },
        {
            title: 'Specific User',
            url: 'wildwords://users/1',
            description: 'Opens a specific user profile page'
        },
        {
            title: 'Auth Page',
            url: 'wildwords://auth',
            description: 'Opens the authentication page'
        }
    ];

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('URL copied to clipboard!');
        });
    };

    return (
        <div className="max-w-6xl mx-auto mb-8">
            {/* Header Section */}
            <header className="text-center md:mb-12 mb-8 p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl">
                <h1 className="text-4xl font-bold mb-2">Deep Link Demo</h1>
                <p className="text-lg opacity-90">Test Capacitor deep linking functionality</p>
                <p className="mt-2 text-base font-bold opacity-80">
                    This page demonstrates Capacitor deep linking functionality. Test the links below by copying them to Safari's address bar or using the "Test Deep Link" buttons directly from the web app running in your iOS simulator.
                </p>
            </header>


            {/* Test Deep Links Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Test Deep Links</h2>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {testDeepLinks.map((link, index) => (
                        <div key={index} className="bg-card/25 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                            <div className="flex flex-col space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {link.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-3">
                                        {link.description}
                                    </p>
                                    <div className="bg-muted rounded-lg p-3 font-mono text-sm text-foreground break-all">
                                        {link.url}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => copyToClipboard(link.url)}
                                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 text-sm flex-1 sm:flex-none"
                                    >
                                        Copy URL
                                    </button>
                                    <a
                                        href={link.url}
                                        className="px-4 py-2 bg-accent text-accent-foreground rounded-md font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 text-sm text-center flex-1 sm:flex-none"
                                    >
                                        Test Deep Link
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Configuration Notes */}
            <div className="bg-card/25 backdrop-blur-md border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                    Configuration Notes
                </h3>
                <p className="text-muted-foreground mb-4">
                    For local development, I am using the custom URL scheme <code className="bg-muted px-2 py-1 rounded text-sm">wildwords://</code>.
                    For production, you would typically use Universal Links (iOS) and App Links (Android) with <code className="bg-muted px-2 py-1 rounded text-sm">https://yourdomain.com</code>.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                    <li>Replace "yourdomain.com" with your actual domain</li>
                    <li>Update the Team ID in apple-app-site-association file</li>
                    <li>Add your SHA256 fingerprint to assetlinks.json</li>
                    <li>Deploy the .well-known files to your website</li>
                    <li>Configure associated domains in Xcode for iOS</li>
                    <li>Add intent filters to AndroidManifest.xml for Android</li>
                </ul>
            </div>
        </div>
    );
};

export default DeepLinkDemoPage;