"use client";
import { Input, Typography } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

export default function Jwt() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <Title level={2} style={{ marginTop: 0 }}>JWT</Title>
    </div>
  );
}
