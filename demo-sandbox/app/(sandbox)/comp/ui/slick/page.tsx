"use client";
import { Typography } from "antd";
import Slider from "react-slick";

const { Title } = Typography;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesPerRow: 1,
  centerMode: true,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1
}

export default function Slick() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Title level={2} style={{ marginTop: 0 }}>Slick</Title>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: '100%' }}>
          <Slider { ...settings }>
            <div>
              <div style={{ background: '#fd10aa', height: '400px'}}>1</div>
            </div>
            <div>
              <div style={{ background: '#cda8ff', height: '400px'}}>2</div>
            </div>
            <div>
              <div style={{ background: '#1195d4', height: '400px'}}>3</div>
            </div>
            <div>
              <div style={{ background: '#94a856', height: '400px'}}>4</div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
