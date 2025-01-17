import { Typography } from "antd";

const { Title } = Typography;

const PageSection = ({ children } : any) => {
    return (<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{ children }</div>
    );
}

export default PageSection;