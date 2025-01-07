'use client';

import useJwtAuth from "@/hooks/useJwtAuth";
import useLink from "@/hooks/useLink";
import useAppStore from "@/stores/store.app";

const Authenticator = ({ children } : { children?: React.ReactNode }) => {
    const { setLoading } = useAppStore();
    const { onLink } = useLink();
    const { status } = useJwtAuth({
        matcher: ["/"],
        onAuthSuccess: () => {
            setLoading(false);
            console.log("인증 실패");
        },
        onAuthFailure: () => {
            setLoading(false);
            console.log("인증 실패");
            onLink("/jwt");
        }
    });
    
    return children;
}

export default Authenticator;