"use client";

import PageTitle from "@/components/PageTitle";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageTitle title={ "jmpark.dev FE SANDBOX" } description={ "이 페이지는 FE Sandbox 입니다." }/>
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
