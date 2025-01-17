"use client";
import PageTitle from "@/components/PageTitle";
import { useToastContext } from "@/config/toast";
import { Button, Typography } from "antd";

const { Title } = Typography;

export default function Modals() {
  const { show } = useToastContext();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageTitle title={ "Toasts" } description={ "Toast Context API 이용한 Modal 생성 예제 페이지입니다." }/>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        
      </div>
    </div>
  );
}
