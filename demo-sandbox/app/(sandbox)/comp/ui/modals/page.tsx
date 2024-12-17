"use client";
import { useModalContext } from "@/config/modal";
import { Button, Typography } from "antd";

const { Title } = Typography;

export default function Modals() {
  const { showAlert, showConfirm, showPopup } = useModalContext();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Title level={2} style={{ marginTop: 0 }}>Modals</Title>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Button onClick={() => { showAlert({
          title: "제목",
          message: "이곳은 메시지가 나오는 곳입니다."
        }) }}>Alert</Button>
        <Button onClick={() => { showConfirm({
          title: "제목",
          message: "이곳은 메시지가 나오는 곳입니다."
        }) }}>Confirm</Button>
        <Button onClick={() => { showPopup({
          children: <>팝업 내용 채우기</>,
          options: {
            closePosition: "topLeft"
          }
        }) }}>Popup</Button>
      </div>
    </div>
  );
}
