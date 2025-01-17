import { Typography } from "antd";

const { Title } = Typography;

const PageSectionTitle = ({ children } : any) => {
    return (
        <Title level={5} style={{ margin: 0, fontWeight: 500 }}>{ children }</Title>
    );
}

export default PageSectionTitle;