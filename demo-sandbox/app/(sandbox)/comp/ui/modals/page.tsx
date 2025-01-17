"use client";
import { useModalContext } from "@/config/modal";
import { Toast, useToastContext } from "@/config/toast";
import { Button, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;

const CustomModal = ({onClick}: any) => {
  const [ text, setText ] = useState();

  return (
    <div>
      <div>asdf</div>
      <input type="text" value={text} onChange={(e: any) => setText(e.target.value)}/>
      <Button type="primary" onClick={() => onClick?.(text)}>토스트</Button>
    </div>
  );
}

export default function Modals() {
  const { show } = useModalContext();
  const { show : showToast} = useToastContext();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Title level={2} style={{ marginTop: 0 }}>Modals</Title>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Button onClick={() => {
          show({
            title: "제목",
            children: <CustomModal onClick={ (text: any) => {
              showToast(<Toast message="text"/>)
            }}/>
          })
        }}>모달 테스트</Button>
      </div>
    </div>
  );
}
