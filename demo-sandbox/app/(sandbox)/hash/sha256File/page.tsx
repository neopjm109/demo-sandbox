"use client";
import PageTitle from "@/components/PageTitle";
import { Input, Typography, Upload } from "antd";
import CryptoJS from "crypto-js";
import sha256 from "crypto-js/sha256";
import { useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const encrypt = (plain: any, set: Function) => set(sha256(plain));

export default function Sha256File() {
  const [ result, setResult ] = useState("");
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageTitle title={ "SHA256 File" } description={ "SHA256 File 암호화 예제 페이지입니다." }/>
      <div style={{ display: 'flex', gap: 16, alignItems: 'start' }}>
        <div style={{ flexGrow: 1}}>
          <Title level={5} style={{ marginTop: 0 }}>Input</Title>
          <Dragger multiple={ false } maxCount={ 1 } height={ 120 }
            beforeUpload={
              (file) => {
                const reader = new FileReader();
                reader.onloadend = (e: any) => {
                  if (e.target?.readyState === FileReader.DONE) {
                    let wordArray = CryptoJS.lib.WordArray.create(e.target.result);
                    encrypt(wordArray, setResult);
                  }
                }
                reader.readAsArrayBuffer(file);
                return false;
              }
            }>
            File upload
          </Dragger>
        </div>
        <div style={{ flexGrow: 1}}>
          <Title level={5} style={{ marginTop: 0 }}>Output</Title>
          <TextArea autoSize={{ minRows: 5, maxRows: 5 }} readOnly={true} value={ result }/>
        </div>
      </div>
    </div>
  );
}
