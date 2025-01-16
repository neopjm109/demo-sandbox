"use client";
import { Flex, Typography } from "antd";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const { Title } = Typography;

const monoData = [
  {
    name: "2024-01",
    amt: 1000,
  },
  {
    name: "2024-02",
    amt: 1300,
  },
  {
    name: "2024-03",
    amt: 1200,
  },
  {
    name: "2024-04",
    amt: 1900,
  },
  {
    name: "2024-05",
    amt: 1400,
  },
  {
    name: "2024-06",
    amt: 1700,
  }
]

const colorData = [
  {
    name: "2024-01",
    amt: 1000,
    fill: '#57c0e8'
  },
  {
    name: "2024-02",
    amt: 1300,
    fill: '#3093f3'
  },
  {
    name: "2024-03",
    amt: 1200,
    fill: '#ff6565'
  },
  {
    name: "2024-04",
    amt: 1900,
    fill: '#ffda83'
  },
  {
    name: "2024-05",
    amt: 1400,
    fill: '#25ac85'
  },
  {
    name: "2024-06",
    amt: 1700,
    fill: '#118955'
  }
]

export default function Charts() {
return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <Title level={2} style={{ marginTop: 0 }}>Charts</Title>
      <Flex vertical gap="small">
        <h2>Line Chart</h2>
        <LineChart width={800} height={400} data={monoData}>
          <Line type="monotone" dataKey="amt" stroke="#3093f3" strokeWidth={2}/>
          <CartesianGrid stroke="#ccc"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
        </LineChart>
      </Flex>
      <Flex vertical gap="small">
        <h2>Area Chart</h2>
        <AreaChart width={800} height={400} data={monoData}>
          <Area type="monotone" dataKey="amt" stroke="#3093f3" strokeWidth={2}/>
          <CartesianGrid stroke="#ccc"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
        </AreaChart>
      </Flex>
      <Flex vertical gap="small">
        <h2>Bar Chart</h2>
        <BarChart width={800} height={400} data={monoData}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="amt" fill="#3093f3"/>
          <Bar dataKey="amt" fill="#ff6565"/>
        </BarChart>
      </Flex>
      <Flex vertical gap="small">
        <h2>Pie Chart</h2>
        <PieChart width={800} height={400}>
          <Pie data={colorData} dataKey="amt" cx="50%" cy="50%" innerRadius={50} label/>
          <Tooltip/>
        </PieChart>
      </Flex>
    </div>
  );
}
