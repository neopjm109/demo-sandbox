"use client";
import PageTitle from "@/components/PageTitle";
import { Button, Input, Typography } from "antd";
import sha256 from "crypto-js/sha256";
import { useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;

const encrypt = (plain: any, set: Function) => set(sha256(plain));

export default function Sha256() {
  const [ plain, setPlain ] = useState("");
  const [ result, setResult ] = useState("");
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageTitle title={ "SHA256" } description={ "SHA256 해시 예제 페이지입니다." }/>
      <div style={{ display: 'flex', gap: 16, alignItems: 'start' }}>
        <div style={{ flexGrow: 1}}>
          <Title level={5} style={{ marginTop: 0 }}>Input</Title>
          <TextArea autoSize={{ minRows: 5, maxRows: 5 }} value={plain} onChange={ (e) => setPlain(e.target.value)}/>
        </div>
        <div>
          <Title level={5} style={{ marginTop: 0 }}>&nbsp;</Title>
          <div style={{ display:'flex', alignItems:'center', height: 120 }}>
            <Button type="primary" onClick={ () => encrypt(plain, setResult) }>Encrypt</Button>
          </div>
        </div>
        <div style={{ flexGrow: 1}}>
          <Title level={5} style={{ marginTop: 0 }}>Output</Title>
          <TextArea autoSize={{ minRows: 5, maxRows: 5 }} readOnly={true} value={ result }/>
        </div>
      </div>
    </div>
  );
}
