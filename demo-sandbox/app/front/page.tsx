'use client';

import { useModalContext } from "@/config/modal";
import useDeviceOS, { OsType } from "@/hooks/useDeviceOs";
import ScrollSpy from "react-scrollspy-navigation";

const FixedBackground = ({ image, os }: any) => {
    return (
        <div className="background">
            <div className={`bg-image ${os === OsType.IOS && 'ios'}`} style={{ backgroundImage: `url(${image})` }}/>
            <div className="bg-dim"/>
        </div>
    );
}

const AppLayout = ({ children }: any) => {
    return (
        <div className="order-app">
            <div className="app-container">{ children }</div>
        </div>
    )
}

const AppTitle = ({ children }: any) => {
    return (
        <div className="title-container">
            <div className="title">{ children }</div>
        </div>
    )
}

const ContentsLayout = ({ categories }: any) => {
    return (
        <div className="app-contents">
            <ScrollSpy activeClass="nav-active" offsetTop={64}>
                <nav className="app-nav">
                    {
                        categories?.map((cate: any, i: number) => (
                            <a href={`#section${i}`} key={cate.key} style={{
                                marginLeft: i === 0 ? "1rem" : "0",
                                marginRight: i === categories?.length - 1 ? "1rem" : "0",
                            }}>
                                { cate.name }
                            </a>
                        ))
                    }
                </nav>
            </ScrollSpy>
            <div>
            {
                categories?.map((cate: any, i: number) => (
                    <section id={`section${i}`} key={ cate?.key } className="menu-section">
                        <div className="section-title">
                            { cate?.name }
                        </div>
                        {
                            cate?.menus?.map((menu: any) => (
                                <div key={ menu.uid }>
                                    { menu.name }
                                </div>
                            ))
                        }
                    </section>
                ))
            }
            </div>
        </div>
    );
}

const BottomNavigation = ({ onClickOrder, onClickList } : any) => {
    return (
        <div className="bottom-navigation">
            <div className="buttons">
                <div className="order-button" onClick={() => onClickOrder?.() }>주문하기</div>
                <div className="list-button" onClick={() => onClickList?.() }>주문내역</div>
            </div>
        </div>
    );
}

const categories = [
    {
        key: "COFFEE",
        name: "COFFEE",
        menus: [
            {
                uid: "1",
                name: "아메리카노"
            }
        ]
    },
    {
        key: "DECAFFEINE",
        name: "DECAFFEINE"
    },
    {
        key: "ADE",
        name: "ADE"
    },
    {
        key: "TEA",
        name: "TEA"
    },
    {
        key: "CAKE",
        name: "CAKE"
    },
    {
        key: "BREAD",
        name: "BREAD"
    }
]

export default function FrontPage() {
    const os = useDeviceOS();
    const { showAlert } = useModalContext();
    return (
        <AppLayout>
            <FixedBackground image="/images/home_security_img01.png" os={os}/>
            <AppTitle>TITLE</AppTitle>
            <ContentsLayout categories={ categories }/>
            <BottomNavigation
                onClickOrder={ () => {
                    showAlert({
                        title: "확인",
                        message: "주문하기 클릭"
                    })
                }}
            />
        </AppLayout>
    );
}