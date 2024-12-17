"use client";
import { Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Title } = Typography;

const fetchData = async () => {
  let res = await axios(
    'http://localhost:9999/api/test',
    {
      headers: {
        "Content-type": "application/json"
      },
      method: "GET"
    }
  );

  return res.data;
}

export default function AxiosBody({ data } : { data : any}) {
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
      <Title level={2} style={{ marginTop: 0 }}>axios</Title>
      <div>
        <div>
          <p>fetch처럼 Server Component에서도 호출 가능</p>
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
