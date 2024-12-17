'use client';

import items from "@/constants/menus";
import useLink from "@/hooks/useLink";
import useAppStore from "@/stores/store.app";
import { CodeSandboxOutlined } from "@ant-design/icons";
import { Flex, Layout, Menu, Spin } from 'antd';

const { Header, Content, Sider } = Layout;

const BaseLayout = ({ children } : { children: React.ReactNode }) => {
    const { loading } = useAppStore();
    const { onLink } = useLink();

    return (
        loading
        ?
            <Flex justify="center" align="center" style={{ height: '100vh' }}>
                <Spin tip="불러오는 중" size="large">
                    <div style={{
                        padding: 50,
                        borderRadius: 4,
                    }} />
                </Spin>
            </Flex>
        :
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{
                    position: 'sticky',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    color: '#fff',
                    fontSize: 16,
                    padding: '0 24px'
                }}>
                    <CodeSandboxOutlined style={{ fontSize: 24 }}/>
                    <div><b>NextJS 14</b> SANDBOX</div>
                </Header>
                <Layout>
                    <Sider width={ 256 }>
                        <Menu
                            mode="inline"
                            style={{ width: 256, height: '100%' }}
                            items={items}
                            defaultOpenKeys={[]}
                            onClick={ (e) => {
                                onLink(e.key);
                            }}/>
                    </Sider>
                    <Layout>
                        <Content style={{ padding: 24 }}>
                            <div style={{ background: '#fff', padding: 24, minHeight: '100%'}}>{ children }</div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
    )
}

export default BaseLayout;