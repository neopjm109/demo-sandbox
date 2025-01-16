"use client";
import { Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

const fetchData = async () => {
  let res = await fetch(
    'http://localhost:9999/api/test',
    {
      headers: {
        "Content-type": "application/json"
      },
      method: "GET"
    }
  );

  if (res.ok) {
    return res.json();
  }
  return null;
}

export default function FetchBody({ data } : { data : any}) {
  const [ result, setResult ] = useState(null);
  const load = async () => {
    let json = await fetchData();
    setResult(json);
  }
  useEffect(() => {
    load();
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <Title level={2} style={{ marginTop: 0 }}>Fetch</Title>
      <div>
        <div>
            <p>Server Component 에서 사용시, 기본 Fetch 기능에 NextJS의 옵션을 추가로 사용 가능</p>
            <p></p>
        </div>
        <div>
            <Title level={5}>Output</Title>
            <div>
              <p><b>Server component result</b></p>
              <p>{ JSON.stringify(data) }</p>
            </div>
            <div>
              <p><b>Client component result</b></p>
              <p>{ JSON.stringify(result) }</p>
            </div>
        </div>
      </div>
    </div>
  );
}
