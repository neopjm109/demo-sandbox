"use client";
import useAppStore from "@/stores/store.app";
import { Button, Typography } from "antd";

const { Title } = Typography;

export default function Zustand() {
  const { info, setInfo } = useAppStore();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Title level={2} style={{ marginTop: 0 }}>Zustand</Title>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {
          JSON.stringify(info)
        }
        <Button onClick={() => {
          console.log(info.count);
          setInfo({
            count: (info?.count ?? 0) + 1
          })
        }}>카운트 + 1</Button>
      </div>
    </div>
  );
}
