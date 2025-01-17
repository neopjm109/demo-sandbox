"use client";
import PageTitle from "@/components/PageTitle";
import { decrypt, encrypt } from "@/utils/utils.aes256";
import { Button, Input, Typography, Switch } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;

// E2CA15DD5697E69B5F836A563491BD3B
// 1D40453CC2A2863C

export default function Aes256() {
  const [ key, setKey ] = useState("");
  const [ iv, setIv ] = useState("");
  const [ isIvOn, setIsIvOn ] = useState(false);
  const [ before, setBefore ] = useState("");
  const [ result, setResult ] = useState("");

  useEffect(() => {
    if (!isIvOn) setIv(key.substring(0, 16));
    else setIv("");
  }, [isIvOn]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <PageTitle title={ "AES256" } description={ "AES256 암호화 예제 페이지입니다." }/>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 300 }}>
          <Title level={5}style={{ marginTop: 0 }}>Key</Title>
          <Input value={key} onChange={ (e) => {
            setKey(e.target.value)
            if (!isIvOn) {
              setIv(e.target.value.substring(0, 16));
            }
          }} />
        </div>
        <div style={{ width: 180 }}>
          <Title level={5}style={{ marginTop: 0, display: 'flex', gap: 16, alignItems: 'center' }}>
            IV
            <Switch size="small" checked={ isIvOn } onChange={ () => setIsIvOn(!isIvOn) }/>
          </Title>
          <Input value={iv} onChange={ (e) => setIv(e.target.value)} readOnly={ !isIvOn } disabled={ !isIvOn }/>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'start' }}>
        <div style={{ flexGrow: 1}}>
          <Title level={5}>Input</Title>
          <TextArea autoSize={{ minRows: 5, maxRows: 5 }} value={before} onChange={ (e) => setBefore(e.target.value)}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title level={5}>&nbsp;</Title>
          <div style={{ display:'flex', flexDirection: 'column', justifyContent:'center', gap: 8, height: 120 }}>
            <Button type="primary" onClick={ () => setResult(encrypt(key, iv, before) ?? "") }>Encrypt</Button>
            <Button type="primary" onClick={ () => setResult(decrypt(key, iv, before) ?? "") }>Decrypt</Button>
          </div>
        </div>
        <div style={{ flexGrow: 1}}>
          <Title level={5}>Output</Title>
          <TextArea autoSize={{ minRows: 5, maxRows: 5 }} readOnly={true} value={ result }/>
        </div>
      </div>
    </div>
  );
}
