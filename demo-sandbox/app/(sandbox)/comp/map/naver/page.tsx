"use client";
import PageTitle from "@/components/PageTitle";
import { Typography } from "antd";

const { Title } = Typography;

export default function NaverMapPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <PageTitle title={ "Naver MAP" } description={ "Naver 지도 API를 연동한 페이지입니다." }/>
      <div>
        
      </div>
    </div>
  );
}
