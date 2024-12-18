import { create } from "zustand";
import type {} from '@redux-devtools/extension'

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
        loading: false,
        setLoading: (data) => set(data)
    })
);

export default useAppStore;