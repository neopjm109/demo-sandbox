import { Typography } from "antd";

const { Title } = Typography;

const PageSectionContainer = ({ children } : any) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{ children }</div>
    );
}

export default PageSectionContainer;