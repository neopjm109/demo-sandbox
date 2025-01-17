"use client";

import PageTitle from "@/components/PageTitle";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageTitle title={ "Login" } description={ "JWT 토큰을 이용한 로그인 기능을 구현한 페이지입니다." }/>
      <div>
        <div>
          <ul>
            <li>Framework : NextJS 14.2</li>
            <li>Design Framework : Antd 5</li>
          </ul>
        </div>
        <div>
          FE 개발시, 빠른 목업을 만들기 위한 목적으로 만들어졌습니다.
        </div>
      </div>
    </div>
  );
}
