'use client';

import { CookiesProvider } from "react-cookie";
import { JwtProvider } from "./authenticator";
import ErrorBoundary from "./errorBoundary";
import Fallback from "./fallback";
import { ModalProvider } from "./modal";
import OfflineObserver from "./offline";
import { ToastProvider } from "./toast";

const Composer = ({
    children, components
}: {
    children: React.ReactNode,
    components: any[]
}) => {
    return components.reduceRight((cur, Comp) => {
        return <Comp>{cur}</Comp>;
    }, children);
}

const Engine = ({
    children
}: {
    children: React.ReactNode,
}) => {
    return (
        <ErrorBoundary fallback={ <Fallback/> }>
            <Composer components={[
                CookiesProvider,
                JwtProvider,
                ModalProvider,
                ToastProvider,
                OfflineObserver
            ]}>
                {children}
            </Composer>
        </ErrorBoundary>
    );
}

export default Engine;