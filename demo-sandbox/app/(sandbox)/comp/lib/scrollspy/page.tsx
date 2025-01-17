"use client";
import ScrollSpy from "react-scrollspy-navigation";
import { Typography } from "antd";
import PageTitle from "@/components/PageTitle";

const { Title } = Typography;

export default function ScrollSpyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      <PageTitle title={ "Scroll Spy" } description={ "react-scrollspy-navigation 라이브러리를 이용한 페이지입니다." }/>
      <div>
        <ScrollSpy activeClass="nav-active">
          <nav style={{ position: 'sticky', top: 10}}>
            <ul>
              <li>
                <a href="#section1">Section 1</a>
              </li>
              <li>
                <a href="#section2">Section 2</a>
              </li>
              <li>
                <a href="#section3">Section 3</a>
              </li>
            </ul>
          </nav>
        </ScrollSpy>
        <div>
          <section style={{ height: 800, background: '#d33333' }}>
            <h2 id="section1">Section 1</h2>
          </section>
          <section style={{ height: 800, background: '#03f303' }}>
            <h2 id="section2">Section 2</h2>
          </section>
          <section style={{ height: 800, background: '#0303f3' }}>
            <h2 id="section3">Section 3</h2>
          </section>
        </div>
      </div>
    </div>
  );
}
