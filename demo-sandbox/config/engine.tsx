'use client';

import ErrorBoundary from "./errorBoundary";
import { CookiesProvider } from "react-cookie";
import Fallback from "./fallback";
import OfflineObserver from "./offline";
import { ModalProvider } from "./modal";
import BaseLayout from "@/components/BaseLayout";
import Authenticator from "./authenticator";

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
                Authenticator,
                ModalProvider,
                OfflineObserver
            ]}>
                {children}
            </Composer>
        </ErrorBoundary>
    );
}

export default Engine;