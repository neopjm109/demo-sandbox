import { useRouter } from "next/navigation";

/**
 * @hook useLink
 * @description
 * NextJS 의존된 Hooks. 라우터 이동용
 */
export default function useLink() {
    const router = useRouter();
    const onLink = (link: string) => {
        router.push(link);
        router.refresh();
    }
    const onBack = () => router.back()
    const onReload = () => window.location.reload()
    const onReplace = (link: string) => window.location.replace(link)
    const onRefresh = () => {
        let refreshUrl = window.localStorage.getItem("REFRESH_URL")
        if (refreshUrl) {
            onReplace(refreshUrl)
        }
    }
    return {
        onLink, onBack, onReload, onReplace, onRefresh
    }
}