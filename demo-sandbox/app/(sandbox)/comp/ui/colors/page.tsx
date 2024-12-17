"use client";
import Colors, { ColorsMode, autoTextColor, getSeason, seasons } from '@/utils/utils.colors'
import { Typography } from "antd";

const { Title } = Typography;

const seasonColor = Colors.get(ColorsMode.SEASONS);
const getSeasonColorKeys : any = (b: "light" | "dark") => seasonColor[b];
const getSeasons : any = (mon: any) => seasons[getSeason(mon)];

export default function ColorsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <Title level={2} style={{ marginTop: 0 }}>Colors</Title>
      <div>
        {
          Object.keys(seasonColor).map((s: any) => (
            <div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', height: 60, fontWeight: 'bold'}}>
                <Title level={5} style={{ width: 160, margin: 0 }}>{ s }</Title>
                <div style={{ width: 120, textAlign: 'center' }}>{ getSeason("jan") }</div>
                <div style={{ width: 120, textAlign: 'center' }}>{ getSeason("apr") }</div>
                <div style={{ width: 120, textAlign: 'center' }}>{ getSeason("jul") }</div>
                <div style={{ width: 120, textAlign: 'center' }}>{ getSeason("nov") }</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap: 4}}>
                {
                  Object.keys(getSeasonColorKeys(s)).map((i: any) => (
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center'}}>
                      <div style={{ width: 160 }}>{ i }</div>
                      <div style={{
                        width: 120,
                        background: getSeasons("jan")[s][i],
                        display: 'flex',
                        alignItems:'center',
                        padding: '10px 12px',
                        border: '1px solid #cfcfcf',
                        borderRadius: 2,
                        color: autoTextColor(getSeasons("jan")[s][i])
                      }}>
                        {getSeasons("jan")[s][i]}
                      </div>
                      <div style={{
                        width: 120,
                        background: getSeasons("apr")[s][i],
                        display: 'flex',
                        alignItems:'center',
                        padding: '10px 12px',
                        border: '1px solid #cfcfcf',
                        borderRadius: 2,
                        color: autoTextColor(getSeasons("apr")[s][i])
                      }}>
                        {getSeasons("apr")[s][i]}
                      </div>
                      <div style={{
                        width: 120,
                        background: getSeasons("jul")[s][i],
                        display: 'flex',
                        alignItems:'center',
                        padding: '10px 12px',
                        border: '1px solid #cfcfcf',
                        borderRadius: 2,
                        color: autoTextColor(getSeasons("apr")[s][i])
                      }}>
                        {getSeasons("jul")[s][i]}
                      </div>
                      <div style={{
                        width: 120,
                        background: getSeasons("nov")[s][i],
                        display: 'flex',
                        alignItems:'center',
                        padding: '10px 12px',
                        border: '1px solid #cfcfcf',
                        borderRadius: 2,
                        color: autoTextColor(getSeasons("apr")[s][i])
                      }}>
                        {getSeasons("nov")[s][i]}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
