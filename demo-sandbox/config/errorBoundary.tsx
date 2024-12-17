import Error from "next/error";
import React, { ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode,
    fallback: ReactNode
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDrivedStateFromError(_: Error, errorInfo: ErrorInfo) {
        return { hasError: true }
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}