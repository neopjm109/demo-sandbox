'use client';
import { Typography } from "antd";

const { Title } = Typography;

const PageTitle = ({ children } : { children: React.ReactNode }) => {
    return (
        <Title level={4} style={{ marginBottom: 24 }}>{ children }</Title>
    );
}

export default PageTitle;