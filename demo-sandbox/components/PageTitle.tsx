import { Typography } from "antd";

const { Title } = Typography;

const PageTitle = ({ title, description } : any) => {
    return (
        <>
            <Title level={2} style={{ margin:0, marginBottom: 4 }}>{ title }</Title>
            <Title level={5} style={{ margin: 0, marginBottom: 8 }}>{ description }</Title>
        </>
    );
}

export default PageTitle;