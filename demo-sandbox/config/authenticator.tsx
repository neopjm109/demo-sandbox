'use client';

import useJwtAuth from "@/hooks/useJwtAuth";

const Authenticator = ({ children } : { children?: React.ReactNode }) => {
    useJwtAuth();
    return children;
}

export default Authenticator;