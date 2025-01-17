import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
        key: "component",
        label: "Components",
        children: [
            {
                key: "map",
                label: "Map",
                type: "group",
                children: [
                    {
                        key: "/comp/map/google",
                        label: "Google Map"
                    },
                    {
                        key: "/comp/map/naver",
                        label: "Naver Map"
                    },
                    {
                        key: "/comp/map/kakao",
                        label: "Kakao Map"
                    }
                ]
            },
            {
                key: "ui",
                label: "UI",
                type: "group",
                children: [
                    {
                        key: "/comp/ui/modals",
                        label: "Modals"
                    },
                    {
                        key: "/comp/ui/toasts",
                        label: "Toasts"
                    },
                    {
                        key: "/comp/ui/form",
                        label: "Custom Form (Antd)"
                    }
                ]
            },
            {
                key: "library",
                label: "Library",
                type: "group",
                children: [
                    {
                        key: "/comp/lib/charts",
                        label: "Charts (Recharts)"
                    },
                    {
                        key: "/comp/lib/scrollspy",
                        label: "Scroll Spy"
                    },
                    {
                        key: "/comp/lib/slick",
                        label: "Slick (Slider)"
                    },
                    {
                        key: "/comp/lib/suneditor",
                        label: "SunEditor"
                    }
                ]
            }
        ]
    },
    {
        key: "hook",
        label: "Custom Hook",
        type: "group",
        children: [
            {
                key: "/hook/link",
                label: "useLink"
            },
            {
                key: "/hook/script",
                label: "useScript"
            },
            {
                key: "/hook/interval",
                label: "useInterval"
            },
            {
                key: "/hook/os",
                label: "useDeviceOs"
            },
            {
                key: "/hook/scrollLock",
                label: "useBodyScrollLock"
            },
            {
                key: "/hook/backLock",
                label: "useHistoryBackLock"
            }
        ]
    },
    {
        key: 'hash-encrypt',
        label: "Hash/Encryption",
        children: [
            {
                key: "hash",
                label: "Hash",
                type: "group",
                children: [
                    {
                        key: "/hash/sha256",
                        label: "SHA256"
                    },
                    {
                        key: "/hash/sha256File",
                        label: "SHA256 File",
                    }
                ]
            },
            {
                key: "encrypt",
                label: "Encryption",
                type: "group",
                children: [
                    {
                        key: "/encrypt/aes256",
                        label: "AES256"
                    },
                    {
                        key: "/encrypt/jwt",
                        label: "JWT Token"
                    },
                ]
            },
            {
                key: "rsa",
                label: "RSA",
                type: "group",
                children: [
                    {
                        key: "/rsa/keygen",
                        label: "Key Generator"
                    },
                    {
                        key: "/rsa/sign",
                        label: "Sign"
                    },
                    {
                        key: "/rsa/verify",
                        label: "Verify"
                    },
                    {
                        key: "/rsa/encrypt",
                        label: "Encrypt"
                    },
                    {
                        key: "/rsa/decrypt",
                        label: "Decrypt"
                    }
                ]
            }
        ]
    },
    {
        key: "etc",
        label: "ETC",
        type: "group",
        children: [
            {
                key: "state",
                label: "State Management",
                children: [
                    {
                        key: "/state/zustand",
                        label: "Zustand"
                    },
                    {
                        key: "/state/reactQuery",
                        label: "React Query"
                    }
                ]
            },
            {
                key: "/comp/cidr",
                label: "CIDR 계산기"
            }
        ]
    }
];

export default items;