import { useRouter } from "next/navigation"

const useLink = () => {
    const router = useRouter();
    const onLink = (link: string) => router.push(link);
    const onBack = () => router.back();
    const onReload = () => window.location.reload();
    const onReplace = (link: string) => window.location.replace(link);
    const onRefresh = (link?: string) => {
        if (link) onReplace(link);
        else onReload();
    }

    return {
        onLink, onBack, onReload, onReplace, onRefresh
    }
}

export default useLink;