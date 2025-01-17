"use client";
import PageTitle from "@/components/PageTitle";
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
      <PageTitle title={ "Modals" } description={ "Modal Context API 이용한 Modal 생성 예제 페이지입니다." }/>
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
