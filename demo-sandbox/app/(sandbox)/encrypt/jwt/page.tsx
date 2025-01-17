"use client";
import PageTitle from "@/components/PageTitle";
import { Input } from "antd";

const { TextArea } = Input;

export default function Jwt() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <PageTitle title={ "JWT" } description={ "JWT 암호화 예제 페이지입니다." }/>
    </div>
  );
}
