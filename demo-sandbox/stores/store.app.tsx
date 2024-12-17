import { create } from "zustand";

interface AppStore {
    info: any;
    setInfo: (data: any) => void;
    loading: any;
    setLoading: (data: any) => void;
}

const useAppStore = create<AppStore>(
    (set, get) => ({
        info: {},
        setInfo: (data) => set(state => {
            state.info = { ...data };
            return { ...state };
        }),
        loading: true,
        setLoading: (data) => set(data)
    })
);

export default useAppStore;