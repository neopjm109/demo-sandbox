"use client";
import { Button, Input, Typography } from "antd";
import NodeRSA from "node-rsa";
import { useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;

// Input: UTF8, Output: Base64, Algorithm: SHA256
const decrypt = (privKey:string, encrypted: any, set: Function) => {
  let rsa = new NodeRSA();
  rsa.importKey(privKey, "private");
  set(rsa.decrypt(encrypted, "utf8"));
};

export default function RsaDecrypt() {
  const [ privKey, setPrivKey ] = useState("");
  const [ plain, setPlain ] = useState("");
  const [ result, setResult ] = useState("");
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <Title level={2} style={{ marginTop: 0 }}>RSA Decrypt</Title>
      <div style={{ display: 'flex', gap: 16, alignItems: 'start' }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ flexGrow: 1, display: 'flex', gap: 12, flexDirection: 'column' }}>
            <div>
              <Title level={5} style={{ marginTop: 0 }}>Private Key</Title>
              <TextArea autoSize={{ minRows: 8, maxRows: 8 }} value={privKey} onChange={ (e) => setPrivKey(e.target.value)}/>
            </div>
            <div>
              <Title level={5} style={{ marginTop: 0 }}>Input</Title>
              <TextArea autoSize={{ minRows: 5, maxRows: 5 }} value={plain} onChange={ (e) => setPlain(e.target.value)}/>
            </div>
          </div>
        </div>
        <div>
          <Title level={5} style={{ marginTop: 0 }}>&nbsp;</Title>
          <div style={{ display:'flex', alignItems:'center', height: 330 }}>
            <Button type="primary" onClick={ () => decrypt(privKey, plain, setResult) }>Decrypt</Button>
          </div>
        </div>
        <div style={{ flexGrow: 1}}>
          <Title level={5} style={{ marginTop: 0 }}>Output</Title>
          <TextArea autoSize={{ minRows: 15, maxRows: 15 }} readOnly={true} value={ result }/>
        </div>
      </div>
    </div>
  );
}
