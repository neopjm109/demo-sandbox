"use client";
import PageTitle from "@/components/PageTitle";
import { Typography } from "antd";

const { Title } = Typography;

export default function KakaoMapPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <PageTitle title={ "Kakao MAP" } description={ "Kakao 지도 API를 연동한 페이지입니다." }/>
      <div>
        
      </div>
    </div>
  );
}
