"use client";
import { Button, Input, Typography } from "antd";
import NodeRSA from "node-rsa";
import { useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;

const generate = (setPrivKey: Function, setPubKey: Function) => {
  let rsa = new NodeRSA();
  rsa = rsa.generateKeyPair(1024);
  setPrivKey(rsa.exportKey("private"));
  setPubKey(rsa.exportKey("public"));
}

export default function RsaKeyGenerator() {
  const [ privKey, setPrivKey ] = useState("");
  const [ pubKey, setPubKey ] = useState("");
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <Title level={2} style={{ marginTop: 0 }}>RSA Key Generator</Title>
      <div>
        <Button type="primary" onClick={ () => generate(setPrivKey, setPubKey) }>Generate</Button>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'start' }}>
        <div style={{ flexGrow: 1}}>
          <Title level={5}>Input</Title>
          <TextArea autoSize={{ minRows: 20, maxRows: 20 }} readOnly={true} value={privKey}/>
        </div>
        <div style={{ flexGrow: 1}}>
          <Title level={5}>Output</Title>
          <TextArea autoSize={{ minRows: 20, maxRows: 20 }} readOnly={true} value={ pubKey }/>
        </div>
      </div>
    </div>
  );
}
