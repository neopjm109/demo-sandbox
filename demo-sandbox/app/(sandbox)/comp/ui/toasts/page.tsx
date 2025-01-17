"use client";
import PageSection from "@/components/PageSection";
import PageSectionContainer from "@/components/PageSectionContainer";
import PageSectionTitle from "@/components/PageSectionTitle";
import PageTitle from "@/components/PageTitle";
import { ToastType, useToastContext } from "@/config/toast";
import { Button, Typography } from "antd";

const { Title } = Typography;

export default function Modals() {
  const { showToast } = useToastContext();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageTitle title={ "Toasts" } description={ "Toast Context API 이용한 Modal 생성 예제 페이지입니다." }/>
      <PageSectionContainer>
        <PageSectionTitle>색상</PageSectionTitle>
        <PageSection>
          <Button onClick={ () => showToast({ message:"기본 색상입니다" }) }>Default</Button>
          <Button onClick={ () => showToast({ message:"Info 색상입니다", type: ToastType.INFO }) }>Info</Button>
          <Button onClick={ () => showToast({ message:"Success 색상입니다", type: ToastType.SUCCESS }) }>Success</Button>
          <Button onClick={ () => showToast({ message:"Warning 색상입니다", type: ToastType.WARNING }) }>Warning</Button>
          <Button onClick={ () => showToast({ message:"Danger 색상입니다", type: ToastType.DANGER }) }>Danger</Button>
        </PageSection>
      </PageSectionContainer>
    </div>
  );
}
