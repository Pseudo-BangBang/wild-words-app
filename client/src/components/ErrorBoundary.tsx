import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex items-center justify-center min-h-[200px] p-8">
                    <div className="text-center max-w-lg bg-card border border-border p-8 rounded-lg">
                        <h2 className="text-destructive text-2xl font-semibold mb-4">Something went wrong</h2>
                        <p className="text-muted-foreground mb-6">We're sorry, but something unexpected happened.</p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="text-left my-4 p-4 bg-muted rounded border border-border">
                                <summary className="cursor-pointer font-bold mb-2">Error Details</summary>
                                <pre className="whitespace-pre-wrap break-words text-xs text-muted-foreground my-2">{this.state.error.message}</pre>
                                <pre className="whitespace-pre-wrap break-words text-xs text-muted-foreground my-2">{this.state.error.stack}</pre>
                            </details>
                        )}
                        <button
                            className="bg-primary text-primary-foreground border-none px-4 py-2 rounded cursor-pointer text-base transition-colors hover:opacity-90"
                            onClick={() => this.setState({ hasError: false, error: undefined })}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
