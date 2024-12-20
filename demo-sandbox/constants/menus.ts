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
                        key: "/comp/ui/charts",
                        label: "Charts (Recharts)"
                    },
                    {
                        key: "/comp/ui/modals",
                        label: "Modals"
                    },
                    {
                        key: "/comp/ui/scrollspy",
                        label: "Scroll Spy"
                    },
                    {
                        key: "/comp/ui/slick",
                        label: "Slick (Slider)"
                    },
                    {
                        key: "/comp/ui/suneditor",
                        label: "SunEditor"
                    }
                ]
            },
            {
                key: "ui",
                label: "UI",
                type: "group",
                children: [
                    {
                        key: "/comp/cidr",
                        label: "CIDR 계산기"
                    }
                ]
            }
        ]
    },
    {
        key: 'hash-crypto',
        label: "Hash/Crypto",
        children: [
            {
                key: "jwt",
                label: "JWT Token"
            },
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
                key: "crypto",
                label: "Crypto",
                type: "group",
                children: [
                    {
                        key: "/crypto/aes256",
                        label: "AES256"
                    }
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
    }
];

export default items;